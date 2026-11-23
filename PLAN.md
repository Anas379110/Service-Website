# Service existing implementation, local feature plan

Status: requirements/design confirmed against repository SCOPE.md and SRS.md, dependency option A selected as the reversible local upgrade path after comparison. No public deployment or content publication in this round.

## Confirmed baseline

Commit e976b8b6438439b38282337d936772179f7ceec8 contains an Astro implementation, not documentation only. Five tests, lint and 11-page build pass. There are no guide articles. Required text search and optional service-type filtering are absent. Dependency audit reports 16 alerts including 3 critical, public deployment is blocked until treated. The README is stale.

## Bounded feature

A visitor can search reviewed guide titles and excerpts and combine country and service-type filters. Arabic search ignores diacritics/tatweel and common alef variants, uses AND across query words, preserves original displayed text, and never interprets query input as HTML. An explicit reset restores initial results. Country pages start scoped to their country. No requests or analytics are sent. No guides or official procedures are generated. Guide approval logic and stale-date warning remain separate existing behavior.

## UI

Use existing turquoise brand and static architecture. Native labeled search/select controls, responsive grid, visible keyboard focus, live result status, separate no-content and no-matches states. Keep all cards visible with a no-JavaScript explanation when scripts are unavailable. No decorative marks. No new dependency, API, database or framework decision in this feature. View state only, not business logic in UI: matching lives in a pure tested module.

## Acceptance and traceability

- SCOPE Must text search: title/excerpt matching, case/Arabic normalization, multiple tokens and empty query tested.
- SRS FR3 country/type: exact combined filters, unknown values yield no matches, input not mutated.
- SRS WCAG: labels, keyboard submit/reset, aria-live count, mobile overflow and focus checked in browser.
- Failure/empty: no-guide inventory, no matches and reset checked with synthetic local fixtures outside published content.
- Security: hostile text remains literal, no innerHTML, no external requests, no content activation. Dependency alerts remain release blockers.

## Sequence

Pure module and regression tests, progressive-enhancement component, integrate home/country pages, local unit/lint/build and browser behavior tests, pixel review, then source/package report. Major dependency migration awaits compared choice. This is functional infrastructure with an empty real catalog, not a completed guides service.
