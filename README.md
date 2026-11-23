# Service

Arabic government and educational guide reader, with an existing Astro implementation.

## Current state

Local functional prototype, not a launched or complete guides service. The real guide catalog is empty. Do not present synthetic test fixtures as government advice or editorially reviewed guides.

Implemented country pages, Arabic title/excerpt search, combined country/service-type filters, result counts, reset, no-match and empty-catalog states, no-JavaScript fallback, review metadata display and stale-guide warnings. Browser checks cover search, filters, reset, migrated guide links, country scoping and responsive layouts. Search runs locally without tracking or a backend.

## Development

Node >=22.23.4. From `websites` run `npm ci`, `npm test`, `npm run lint`, `npx astro check`, `npm run build`. Astro 7 uses `src/content.config.ts`, a glob content loader, entry IDs and the `render` helper. Existing Tailwind 3 remains through PostCSS rather than the incompatible legacy Astro adapter.

## Publication boundary

No government guide text was added in this engineering round. A nonblank reviewer field alone is metadata, not proof of human review or of an official source's identity. Guides need real current source verification, original permitted content, a real review and appropriate editorial decisions before publication. HTTPS URL validation rejects executable schemes and embedded credentials but does not establish that a host is official. No new ads, accounts, subscriptions or analytics were activated. Development pages and robots remain noindex/disallow. No valid production origin or deployment is claimed.

The older target of 30-50 guides remains unmet. This repository is no longer described as documentation only, but it is also not described as a finished service.
