/**
 * Site-wide search-engine indexing switch.
 *
 * Flip `SEARCH_ENGINE_INDEXING_ENABLED` to `true` when the app (including
 * `/simulator`) should be crawlable. Then also update:
 * - `public/robots.txt` (Allow: /)
 * - `vercel.json` X-Robots-Tag (index, follow) — or remove the header
 *
 * `app/+html.tsx` reads this module automatically.
 */
export const SEARCH_ENGINE_INDEXING_ENABLED = false;

export function robotsMetaContent(): string {
  return SEARCH_ENGINE_INDEXING_ENABLED
    ? "index, follow"
    : "noindex, nofollow, noarchive";
}
