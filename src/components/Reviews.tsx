"use client";

// "What Our Guests Say": guest reviews in a row that moves one card to the left every few seconds,
// with arrows, dots and a pause button. It stops while the visitor hovers, focuses or touches it,
// and doesn't move by itself for visitors who prefer reduced motion. Reviews: src/data/reviews.ts.

import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow, button } from "@/components/ui";
import { reviewSummary, reviews, type Review } from "@/data/reviews";
import { site } from "@/data/site";

const ADVANCE_EVERY_MS = 4500;

const STAR = "M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z";

/** Five stars filled to the rating, partly filled for halves (4.5 → four and a half). */
function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="inline-flex gap-0.5 text-gold">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, rating - (n - 1)));
        return (
          <span key={n} className="relative inline-block">
            <svg viewBox="0 0 20 20" aria-hidden="true" className={`block opacity-25 ${className}`}>
              <path fill="currentColor" d={STAR} />
            </svg>
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 20 20" aria-hidden="true" className={`block max-w-none ${className}`}>
                  <path fill="currentColor" d={STAR} />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/** The overall rating with its stars and review count, linking to the reviews on Google. */
function RatingSummary({ rating, count, large = false }: { rating: number; count?: number; large?: boolean }) {
  return (
    <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
      <span className={`font-serif text-ink ${large ? "text-6xl" : "text-5xl"}`}>{rating.toFixed(1)}</span>
      <span className="flex flex-col gap-1">
        <Stars rating={rating} className={large ? "h-6 w-6" : "h-5 w-5"} />
        <span className="text-sm text-ink/60 group-hover:text-maroon group-hover:underline">
          {count ? `${count.toLocaleString("en-US")} reviews on Google` : "on Google"}
        </span>
      </span>
    </a>
  );
}

/** "Read our reviews" and "Write a review" on Google. */
function GoogleLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={button.maroon}>
        Read Our Reviews
      </a>
      <a href={site.googleWriteReviewUrl} target="_blank" rel="noopener noreferrer" className={button.maroonOutline}>
        Write a Review
      </a>
    </div>
  );
}

function ReviewCard({ review, index, total }: { review: Review; index: number; total: number }) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      data-card
      className="flex w-[88%] shrink-0 snap-start flex-col border-t-4 border-ink/10 bg-sand/60 p-6 sm:w-[calc((100%-1.5rem)/2)] sm:p-8 lg:w-[calc((100%-3rem)/3)]"
    >
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-semibold text-ink">
          {review.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{review.name}</p>
          <p className="truncate text-sm text-ink/60">
            {review.location ? `${review.location} · ` : ""}
            {review.source}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 line-clamp-7 leading-relaxed text-ink/80">{review.text}</p>
    </article>
  );
}

const arrow =
  "flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-maroon hover:text-maroon";

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(1); // cards in view at once
  const [paused, setPaused] = useState(false); // the visitor's pause button
  const [held, setHeld] = useState(false); // hovering, focused or touching
  const [reduceMotion, setReduceMotion] = useState(false);

  // One card's width plus the gap: how far the arrows and the timer move.
  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  const move = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      const atStart = track.scrollLeft <= 4;
      if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else if (direction === -1 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      else track.scrollBy({ left: direction * step(), behavior: "smooth" });
    },
    [step],
  );

  // Dots: one per screenful of cards; the current one follows the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const width = step();
      if (!width) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const inView = Math.max(1, Math.round((track.clientWidth + gap) / width));
      const total = Math.max(1, Math.ceil(reviews.length / inView));
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      setPerView(inView);
      setPages(total);
      setPage(atEnd ? total - 1 : Math.min(total - 1, Math.round(track.scrollLeft / (inView * width))));
    };
    track.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update); // also runs once on start
    resize.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [step]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Move one card to the left every few seconds, while it's on screen and not held or paused.
  useEffect(() => {
    if (paused || held || reduceMotion) return;
    const track = trackRef.current;
    if (!track) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.3 });
    observer.observe(track);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) move(1);
    }, ADVANCE_EVERY_MS);
    return () => {
      window.clearInterval(id);
      observer.disconnect();
    };
  }, [paused, held, reduceMotion, move]);

  if (reviews.length === 0) {
    if (!reviewSummary) return null;
    return (
      <section aria-labelledby="reviews-title" className="bg-cream px-3 py-20 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-maroon/10 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <Eyebrow>Guest Stories</Eyebrow>
            <h2 id="reviews-title" className="mt-5 font-serif text-4xl text-maroon md:text-5xl">
              What Our Guests Say
            </h2>
            <p className="mt-3 max-w-md text-ink/65">Rated by our guests on Google. Read what they say, or tell us about your visit.</p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <RatingSummary rating={reviewSummary.rating} count={reviewSummary.count} large />
            <GoogleLinks />
          </div>
        </div>
      </section>
    );
  }
  const moving = !paused && !reduceMotion;

  return (
    <section aria-labelledby="reviews-title" className="bg-cream px-3 py-24 sm:px-6">
      <div
        className="mx-auto max-w-6xl rounded-[2rem] bg-white px-5 py-8 shadow-sm ring-1 ring-maroon/10 sm:p-10 lg:p-12"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
        }}
        onTouchStart={() => setHeld(true)}
        onTouchEnd={() => window.setTimeout(() => setHeld(false), 4000)}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Guest Stories</Eyebrow>
            <h2 id="reviews-title" className="mt-5 font-serif text-4xl text-maroon md:text-5xl">
              What Our Guests Say
            </h2>
            <p className="mt-3 text-ink/65">Real reviews from Athidhi guests on Google.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {reviewSummary && <RatingSummary rating={reviewSummary.rating} count={reviewSummary.count} />}
            <div className="flex gap-3">
              <button type="button" onClick={() => move(-1)} aria-label="Previous review" className={arrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next review" className={arrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play the reviews" : "Pause the reviews"}
                  className={arrow}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          aria-live={moving && !held ? "off" : "polite"}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
        >
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} index={index} total={reviews.length} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show reviews, page ${i + 1} of ${pages}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => trackRef.current?.scrollTo({ left: i * perView * step(), behavior: "smooth" })}
                className={`h-2.5 rounded-full transition-all ${i === page ? "w-6 bg-maroon" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
              />
            ))}
          </div>
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-maroon underline-offset-4 hover:underline">
            Read all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
