# Service release runbook

23 November 2026. Free-only static Astro. Development staging is live, product is NOT launched. No custom domain is assumed.

## Current development deployment
https://service-reader-staging.onrender.com/ . Render static service srv-dc285p4ipgvc73829rvg. Tested application revision e67c91450a98fc6d17912d5a40c1e2fda048493a, deploy dep-dc28b856e07s73b2cdtg. Root websites, Node 22.23.5, build npm ci && npm run build, publish dist. Auto-Deploy OFF. The free Hobby workspace had no card on file at creation. Recheck current quota and plan before future deployment; never upgrade or start a paid trial.

Cloudflare-compatible websites/public/_headers does not configure Render. Actual Render dashboard headers were separately configured and HTTP-verified: Content-Security-Policy, Permissions-Policy, Referrer-Policy and X-Robots-Tag. Nosniff is supplied by the platform. Preserve these settings when changing hosts. Privacy currently names Render and links its policy.

## Local and hosted checks
From websites run npm ci, npm test, npm run lint, npx astro check, npm audit and npm run build. The last local check passed 20 tests, lint, diagnostics, build and audit with zero findings. quality.yml is published, but https://github.com/Anas379110/Service-Website/actions/runs/45234309052 did not start because the account is locked for billing. Do not call hosted CI operational or passing. Do not change payment or repeatedly retry the locked run.

## Production gate
SERVICE_ORIGIN set to the actual HTTPS production origin and SERVICE_CONTACT_EMAIL=homsi434q@gmail.com with npm run build:production require at least 30 reviewed guides, all five countries, current official-source dates, exact allowed hosts and an approval ledger matching text hash, date, reviewer and evidence. The structural check cannot authenticate review. Populate it only from genuine exact-text human approval, never a fabricated reviewer or encouragement to continue. Keep private review evidence out of public source.

33 private drafts exist; 0 are human approved and 0 public. Drafts 5, 30 and 31 retain source-access blockers. Do not import or expose the private draft archive before approval. Ordinary builds remain development, noindex/disallow, and production canonical/sitemap origin is not asserted.

## Qualification before promotion
Inspect 320/390/1280 layouts, all routes, search/filter/reset/no-match/empty/404/no-JavaScript behavior, source links, contact, CSP console and outbound requests. The empty development reader passed these applicable checks on 23 November. Mobile Lighthouse measured 100 performance, 100 accessibility, 100 best practices and 63 SEO due intentional noindex, not certification. Repeat on the actual reviewed catalog and same artifact to be promoted.

Set verified production origin, update host privacy if needed, enable indexing only with completed release, then verify actual SSL, routes, headers, source links, contact and guide counts. Record source SHA and deployment URL. No paid domain, analytics, ad network, account system or document collection is authorized by this runbook.

## Backup and rollback
Keep changed-files archive plus a complete immutable artifact hash before production. Restore into a separate directory and check actual output. Development artifact restoration and mobile/link checks passed separately, not a production rollback.

The old Render deployment confirmation route was reachable but displayed a Build not found panel. No rollback was submitted. Rollback is NOT proven. Render confirmation also warns that headers are not rolled back, so verify dashboard headers separately. Resolve supported recovery and arrange live health confirmation before production launch. Do not delete source/content or claim free cancellation or recovery without verifying it.

## Operations
Recheck official sources within 60 days. Preserve the actual verification date until genuinely rechecked and show stale warnings. Arrange scoped post-launch monitoring after launch; no on-call SLA is claimed. Never upgrade automatically.
