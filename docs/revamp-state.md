# Rose Quartz Revamp State

Updated: 2026-05-27

## Local Checkpoints

- `revamp-baseline-360` points to `d04b544`, the saved local checkpoint after the 360 room-view pass.
- Before this continuation, `main` and `origin/main` were aligned at `3ff1a22` with the Sample Rose Session Map already pushed.
- The current revamp direction is documented in `docs/competitive-website-review.md` and `docs/experience-360-build-notes.md`.

## Current Experience Wins

- Homepage now gives new guests fast paths into Care Mapping, first-visit guidance, rates, and a sample Session Map.
- The 360 room preview uses a generated 2:1 panorama, lazy-loaded Three.js viewer, waypoints, fallback image, and responsive controls.
- Care Mapping is framed as a tangible first-visit output: the Rose Session Map summarizes body areas, pressure boundaries, session pathway, and aftercare.
- The request flow now explains trust, intake boundaries, and the preview/copy/contact/confirmation handoff before details are entered, then creates a copyable draft instead of pretending a live booking integration exists.
- Pricing, services, first-visit, and specialty pages now carry clearer conversion paths for unsure guests, including a post-first-visit care-rhythm explanation that avoids unsupported membership terms.
- The First Visit guide now includes a five-minute prep checklist so guests can name goals, boundaries, cautions, and privacy limits before drafting a request.
- Homepage guest questions now answer whether the request form confirms an appointment, how to keep sensitive details minimal, and how unsure guests can start with Care Mapping.
- Homepage FAQ answers now have matching FAQPage structured data for search visibility without adding unsupported launch facts.
- The hero now presents the 90-minute New Client Care Mapping path as the recommended first-visit offer with duration, rate, outcomes, and a request link.
- The homepage request-confidence guide now covers mapping, ask-first notes, minimal private disclosure, and provider-clearance pauses before a guest drafts a request.
- Custom conversion controls now have visible keyboard focus styling across hero links, care chips, map zones, session-length options, and trust links.
- The First Visit guide now includes a confirmation-response flow covering accept, adjust, provider-guidance, and pause outcomes before a session is accepted.
- The homepage request preview now works before name or contact details are added, with placeholders in the copyable draft for privacy-minded guests.
- High-intent CTAs now use "Preview" language and the hero offer states the request is a preview before Rose confirms fit, timing, details, and policies.

## Validation Recipe

Run these before each push:

```powershell
npm.cmd run build
npm.cmd run launch-check
npm.cmd run sitemap -- --site-url=https://rosequartzmassage.com --dry-run
git diff --check
```

The launch check is expected to keep warning until Rose provides real public launch facts.

## Still Needed Before Public Launch

- Live booking platform URL or production form destination.
- Real phone, email, license number, service area or address, hours, and policy details.
- Approved reviews, testimonials, or review links.
- Final room, table, practitioner, or arrival photography when available.
