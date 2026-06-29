# /private/research

This folder is intentionally **outside** `/public`, so Next.js never serves
these files as static assets — they are not publicly listable, linkable, or
indexable by search engines. The only way to reach a PDF in here is through
the route at `app/api/research/[slug]/route.ts`, which streams it inline
(view-only, no forced download, no-cache, noindex headers).

## Adding a paper

1. Drop the PDF in this folder, named to match its `slug`, e.g.:

   ```
   private/research/democratization-decarbonization-ai.pdf
   private/research/merger-regulation-kenya.pdf
   private/research/ai-enabled-regulation.pdf
   private/research/cross-border-data-transfer.pdf
   private/research/unbiased-hiring-algorithms.pdf
   ```

2. Make sure the same `slug` exists in the `papers` array inside
   `app/about/page.tsx` (in the `Research` section) — the slug is what
   connects a paper card to its file.

3. That's it — the "View paper" action on that card will automatically
   open the inline viewer pointed at `/api/research/<slug>`.

No file here should ever be referenced directly from `/public` or from a
plain `<a href="/research/....pdf">` link — always go through the API route
above so the protective headers are applied.
