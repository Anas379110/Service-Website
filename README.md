# Service

Arabic independent guide reader for Syria, Saudi Arabia, UAE, Qatar and Kuwait.

## Launched 24 November 2026

30 original guides have automated editorial/source review, not human or government approval. Official pages were read against practical claims, limitations remain beside the instructions, and unverified drafts5/30/31are excluded. No authenticated government transaction was tested. The catalog is not a substitute for the official terms.

Country pages, Arabic search, combined filters, reset, no-match state, no-JavaScript fallback, source links and correction contact are implemented. No ads, analytics, account system or application form is active.

## Build

Node22.23.5or later. In `websites`: `npm ci`, `npm test`, `npm run lint`, `npx astro check`, `npm run build`.

`release-mode.json` explicitly selects production. Every production Astro build runs the recursive source/recency/country/count/exact-content-review gate before creating routes. The ledger records the actual automated review method. A reviewer label alone cannot publish a guide. Edits change the content hash and fail production builds until reviewed again.

Origin: https://service-reader-staging.onrender.com/ . This free Render hostname retains its original staging name. The30guide release is live; dated deployment and verification evidence is in LAUNCH.md.
