// Build-time markdown loader for the articles section. Articles live in
// content/articles/*.md (one file per article, filename becomes the URL slug).
// Parsed only at build/static-render time; none of this ships to the browser.
//
// The frontmatter format is a small, documented subset of YAML (see README).
// It is parsed here rather than with a library so the dependency surface stays
// at "marked" alone. The parser fails the build loudly on anything it does not
// understand: a malformed article should stop the deploy, not publish quietly.
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "@/content/site";

export type ArticleFaq = { question: string; answer: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  summary: string;
  /** Drafts render with a visible badge, stay out of the sitemap, and are noindexed. */
  draft: boolean;
  faq: readonly ArticleFaq[];
  /**
   * Who wrote it. The founder's own name ("Allie Esslinger") reserves the hero
   * tier of the index; every other value (or an omitted key, resolved to the
   * studio) is a studio note that flows into the carousels.
   */
  author: string;
  /** Optional series name; articles sharing one are grouped into a named carousel. */
  series?: string;
  /** Card art path under /public (e.g. "/articles/my-hero.png"). Falls back to the first body image. */
  image?: string;
};

export type Article = ArticleMeta & { contentHtml: string };

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

class ArticleFormatError extends Error {
  constructor(message: string) {
    super(`${message}; frontmatter format: single-line "key: value" scalars, optional double quotes`);
    this.name = "ArticleFormatError";
  }
}

/** Strips one layer of matching double quotes and unescapes the two escapes we allow. */
function scalarValue(raw: string, file: string, lineNo: number): string {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) {
    return value
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  if (value.startsWith('"')) {
    throw new ArticleFormatError(`${file}:${lineNo}: value opens with a double quote but does not close it`);
  }
  return value;
}

type FrontmatterScalars = {
  title?: string;
  date?: string;
  summary?: string;
  draft?: string;
  author?: string;
  series?: string;
  image?: string;
};

/** Accepted top-level keys. Anything else fails the build with the file and line number. */
const KNOWN_KEYS: readonly string[] = ["title", "date", "summary", "draft", "author", "series", "image"];

function parseFrontmatter(raw: string, file: string): Omit<ArticleMeta, "slug"> {
  const scalars: FrontmatterScalars = {};
  const faq: ArticleFaq[] = [];
  let entry: Partial<ArticleFaq> | null = null;

  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i];
    if (line.trim() === "") continue;

    // Top-level scalar: `key: value` (split on the first colon only).
    const scalar = line.match(/^(\w+):\s*(.*)$/);
    if (scalar && !line.startsWith(" ")) {
      const key = scalar[1];
      const rest = scalar[2];
      if (key === "faq") {
        if (rest) {
          throw new ArticleFormatError(`${file}:${lineNo}: "faq:" opens a list; entries go on the lines below`);
        }
        entry = null;
        continue;
      }
      if (!KNOWN_KEYS.includes(key)) {
        throw new ArticleFormatError(`${file}:${lineNo}: unknown frontmatter key "${key}"`);
      }
      if (!rest) {
        throw new ArticleFormatError(`${file}:${lineNo}: "${key}" needs a value`);
      }
      scalars[key as keyof FrontmatterScalars] = scalarValue(rest, file, lineNo);
      continue;
    }

    // FAQ list entries: `  - question: ...` starts one, `    answer: ...` completes it.
    const newItem = line.match(/^\s{2,}-\s+question:\s*(.*)$/);
    if (newItem) {
      if (entry && (!entry.question || !entry.answer)) {
        throw new ArticleFormatError(`${file}:${lineNo}: the previous FAQ entry is missing its answer`);
      }
      if (!newItem[1]) {
        throw new ArticleFormatError(`${file}:${lineNo}: FAQ question needs a value`);
      }
      entry = { question: scalarValue(newItem[1], file, lineNo) };
      faq.push(entry as ArticleFaq);
      continue;
    }
    const answerItem = line.match(/^\s{4,}answer:\s*(.*)$/);
    if (answerItem) {
      if (!entry) {
        throw new ArticleFormatError(`${file}:${lineNo}: "answer:" must follow a "- question:" line`);
      }
      if (!answerItem[1]) {
        throw new ArticleFormatError(`${file}:${lineNo}: FAQ answer needs a value`);
      }
      entry.answer = scalarValue(answerItem[1], file, lineNo);
      continue;
    }

    throw new ArticleFormatError(`${file}:${lineNo}: unrecognized line "${line.trim()}"`);
  }

  if (entry && (!entry.question || !entry.answer)) {
    throw new ArticleFormatError(`${file}: the last FAQ entry is missing its answer`);
  }
  for (const key of ["title", "date", "summary"] as const) {
    if (!scalars[key]) {
      throw new ArticleFormatError(`${file}: required key "${key}" is missing`);
    }
  }
  if (!scalars.draft) {
    throw new ArticleFormatError(`${file}: required key "draft" is missing (add "draft: true" or "draft: false")`);
  }
  if (scalars.draft !== "true" && scalars.draft !== "false") {
    throw new ArticleFormatError(`${file}: draft must be true or false`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(scalars.date as string)) {
    throw new ArticleFormatError(`${file}: date must be yyyy-mm-dd`);
  }

  return {
    title: scalars.title as string,
    date: scalars.date as string,
    summary: scalars.summary as string,
    draft: scalars.draft === "true",
    faq,
    author: scalars.author ?? SITE.name,
    series: scalars.series,
    image: scalars.image,
  };
}

function readFile(slug: string): Article {
  const file = `${slug}.md`;
  const source = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");

  const fence = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fence) {
    throw new ArticleFormatError(`${file}: must start with a --- frontmatter block`);
  }
  const meta = parseFrontmatter(fence[1], file);

  const html = marked(fence[2].trim(), { async: false });
  // Card art: explicit frontmatter image, else the first image embedded in the body.
  const bodyImage = html.match(/<img[^>]+src="([^"]+)"/)?.[1];
  return { slug, ...meta, contentHtml: html, image: meta.image ?? bodyImage };
}

/** Every article, newest first. Reads the filesystem at build time. */
export function listArticles(): readonly ArticleMeta[] {
  const slugs = fs
    .readdirSync(ARTICLES_DIR)
    // README.md is folder documentation (GitHub renders it), not an article.
    .filter((f) => f.endsWith(".md") && !f.startsWith("README"))
    .map((f) => f.replace(/\.md$/, ""));
  return slugs
    .map((slug) => readFile(slug) as ArticleMeta)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

/** True when the article is authored by the founder herself; those posts own the index hero tier. */
export function isByFounder(article: Pick<ArticleMeta, "author">): boolean {
  return article.author === SITE.owner;
}

/** One article by slug, or undefined when no file matches. */
export function getArticle(slug: string): Article | undefined {
  if (!/^[\w-]+$/.test(slug)) return undefined;
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return readFile(slug);
}

/** "2026-10-19" → "October 19, 2026" (build-time ICU, deterministic for a fixed Node). */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function articleUrl(slug: string): string {
  return `${SITE.url}/ideas/${slug}/`;
}
