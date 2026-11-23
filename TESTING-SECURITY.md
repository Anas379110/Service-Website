# Service testing and security qualification

23 November 2026. Development staging live at https://service-reader-staging.onrender.com/ . Product NOT launched. Tested application revision e67c91450a98fc6d17912d5a40c1e2fda048493a.

## Local checks
20 unit tests passed, covering Arabic normalization/search, content filtering/freshness and release evidence validation. Lint passed; Astro diagnostics checked 29 files with zero errors, warnings or hints. Development build generated 11 pages. npm audit reported zero vulnerabilities at the check, not a guarantee of no vulnerabilities.

Production release validation deliberately rejects missing reviewed catalog, origin, contact configuration and matching human approval records. Fictional test reviewers and hashes appear only in explicitly labeled unit fixtures, never as real editorial evidence. Synthetic browser content fixtures were removed from the published source.

## Functional and visual checks
Header-enforced local browser checks passed Arabic title/excerpt search, combined country/type filters, reset, live count, no-match, hostile input treated literally, country scoping and no-JavaScript cards using temporary synthetic fixtures. Actual 320/390/1280 output was inspected for readability and overflow. The final clean reader contains no guide routes.

Live empty-reader checks passed home, about, contact, privacy, terms and all five country routes with 200, and unknown route with 404. Reset, no-JavaScript empty fallback, approved mailto and host privacy link were verified. No page errors or third-party requests were observed in the check. Actual mobile/desktop pixels were inspected. Future approved content requires repeating guide/source-link and populated-reader checks.

Live mobile Lighthouse after fixing the local favicon scored performance 100, accessibility 100, best practices 100 and SEO 63. SEO reflects deliberate development noindex. These are one-run measurements, not performance, accessibility or security certification.

## Security and privacy boundaries
Search uses normalized plain-string matching, not innerHTML, remote search, tracking or persistence. HTTPS source validation excludes executable schemes, embedded credentials and unlisted authority hosts at release. An allowed host or reviewer label does not authenticate facts or permission.

System fonts are used; no external font request remains. No visitor account, upload form, analytics or active ad network was added. Staging keeps noindex/nofollow response and meta directives plus robots Disallow. Render-specific response headers were separately configured and verified; Cloudflare _headers alone is not active Render configuration. Privacy identifies Render and links its policy without claiming anonymous or data-free hosting.

## Known limitations
33 private drafts, 0 genuine human approvals, 0 public guides. Drafts 5, 30 and 31 have a practical official-source access gap. Full reviewed catalog, real production origin/configuration, production deployment and final populated-site qualification remain.

Hosted GitHub Actions did not start because of account billing lock: https://github.com/Anas379110/Service-Website/actions/runs/45234309052 . Local success is not hosted-CI success. No payment change or retry was made.

Immutable development-artifact restore was checked, but production rollback was not. Prior Render rollback confirmation also displayed Build not found; no rollback was submitted. No production monitoring or incident-response guarantee is claimed.
