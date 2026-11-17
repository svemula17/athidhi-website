// Guest reviews for the home page's "What Our Guests Say" carousel (src/components/Reviews.tsx).
// Use real reviews only, copied as written from the restaurant's Google listing. The section stays
// hidden until this list has entries.

export type Review = {
  name: string;
  /** Where the guest is from, if their review shows it. */
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "Google";
};

/** The restaurant's overall Google rating, shown beside the reviews. Update it from time to time. */
export const reviewSummary: { rating: number; count?: number } | null = null;

export const reviews: Review[] = [];
