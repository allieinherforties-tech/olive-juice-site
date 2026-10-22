"use client";

// Horizontal scroll row for the Allie Intelligence index. The page (a server
// component) renders the cards; this wrapper only owns the arrow scrolling.
// Without JavaScript the track still scrolls natively: touch, trackpad, and
// drag all work, because the arrows are an enhancement, not the mechanism.
import { useRef, type ReactNode } from "react";

type CarouselProps = { label: string; children: ReactNode };

export default function Carousel({ label, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div ref={trackRef} className="carousel__track" aria-label={label}>
        {children}
      </div>
      <div className="carousel__nav">
        <button
          type="button"
          className="carousel__arrow"
          aria-label={`Scroll ${label} backward`}
          onClick={() => scroll(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className="carousel__arrow"
          aria-label={`Scroll ${label} forward`}
          onClick={() => scroll(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
