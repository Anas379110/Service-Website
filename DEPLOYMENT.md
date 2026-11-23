# Service release runbook

Not deployed. Free-only static Astro. No custom domain is assumed. Current prepared Cloudflare-compatible headers are not active until verified on actual hosting.

## Local and CI
Node22.23.5, websites npm ci, lint, astro check, test, audit, build. quality.yml published in commit baf2ead46ee33c142c92a938a8ac650c8601f5c2. Run45234309052 did not start because GitHub account is locked for billing; no hosted checks executed. Local checks pass. Never call CI enabled without observed run URL and green result. Public GitHub standard Linux runner only, no paid runner/upgrade.

## Production gate
`SERVICE_ORIGIN=https://actual-origin SERVICE_CONTACT_EMAIL=homsi434q@gmail.com npm run build:production` requires30reviewed guides/all5countries, current source dates, allowed exact source hosts and review ledger matching content hash/date/name/evidence. This structural check cannot itself verify authorship/review; enter ledger only from genuine trusted review. No bypass reviewer. Until then ordinary builds are development, noindex/disallow.

## Staging
Build from verified revision. No generated unrevised content may be publicly exposed as a preview. Use current empty reader/private review packages until editorially approved. Inspect320/390/1280, all routes and search/filter/empty/error/404/noJS, outbound source links, contact, CSP console, no third-party requests. Run Lighthouse on actual preview, target>90without claiming certification. Only promote same tested artifact after checks.

## Production
Choose verified free host origin. Set canonical/sitemap to actual origin. Update privacy with actual host and policy link. Switch robots/indexing only with genuine completed release. Do not add paid domain, ads, collection forms or analytics. Verify final SSL, routes, headers, contact and published guide/source counts from live site. Record source SHA and deployment URL.

## Backup/restore/rollback
Create changed-files package plus complete immutable artifact hash before production. Restore artifact to separate temporary directory and rerun page/link checks, not only archive existence. Keep previous deployment for rollback, verify supported UI route before launch. On failed live health check restore previous tested deploy; do not delete source/content. Immutable development artifact was copied to a separate directory, byte hashes matched, and restored routes/search initialization/mobile widths passed. This is not a production rollback; no production deployment or monitoring exists.

## Operations
Review official guide sources within60days, mark stale entries visibly, preserve original verification date until actually rechecked. Parent arranges scoped update monitoring after launch, no invented on-call SLA. Report cost limits; never upgrade.
