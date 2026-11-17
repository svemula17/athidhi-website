// Guest reviews for the home page's "What Our Guests Say" carousel (src/components/Reviews.tsx).
// Real reviews only, which the restaurant has the right to show (for example from Google's official
// reviews feed). With no reviews, the section shows the Google rating and links instead.

export type Review = {
  name: string;
  /** Where the guest is from, if their review shows it. */
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "Google";
};

/** The restaurant's overall Google rating, shown with the reviews. As on Google, Nov 17 2026; update it from time to time. */
export const reviewSummary: { rating: number; count?: number } | null = { rating: 4.5, count: 259 };

export const reviews: Review[] = [];
