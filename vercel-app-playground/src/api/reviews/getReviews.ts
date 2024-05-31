import type { Review } from './review';

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.
import 'server-only';

export async function getReviews() {
  const res = await fetch(`https://app-playground-api.vercel.app/api/reviews`);

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const reviews = (await res.json()) as Review[];
  return reviews;
}
