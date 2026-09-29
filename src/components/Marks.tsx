import {
  HEART_PATH,
  HEART_VIEWBOX,
  SKYLINE_HEART_PATH,
  SKYLINE_LINE_PATH,
  SKYLINE_VIEWBOX,
} from "./brand-paths";

type MarkProps = {
  className?: string;
  /** Accessible label. Omit for purely decorative uses (rendered aria-hidden). */
  title?: string;
  /** Stroke/line color for the skyline. Defaults to the brand ink. */
  lineColor?: string;
};

function a11yProps(title: string | undefined) {
  return title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
}

/** The NYC skyline line-art that ends in a small red heart — the Olive Juice mark. */
export function SkylineMark({ className, title, lineColor = "var(--ink)" }: MarkProps) {
  return (
    <svg className={className} viewBox={SKYLINE_VIEWBOX} xmlns="http://www.w3.org/2000/svg" {...a11yProps(title)}>
      <path d={SKYLINE_LINE_PATH} fill={lineColor} fillRule="evenodd" />
      <path d={SKYLINE_HEART_PATH} fill="var(--red)" />
    </svg>
  );
}

/** The hand-drawn red heart from the brand swatch sheet. */
export function HeartMark({ className, title }: Omit<MarkProps, "lineColor">) {
  return (
    <svg className={className} viewBox={HEART_VIEWBOX} xmlns="http://www.w3.org/2000/svg" {...a11yProps(title)}>
      <path d={HEART_PATH} fill="var(--red)" />
    </svg>
  );
}
