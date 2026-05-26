# Rose Quartz Massage Launch Readiness

This site is ready as a polished prototype, but a real launch still needs Rose's business details, booking destination, and compliance-sensitive copy. Keep these items explicit so the public site does not invent information.

## Required Before Public Launch

- Copy `docs/launch-facts.template.json` to `docs/launch-facts.json`, fill it with real public business facts, then run `npm.cmd run launch-check:strict`.
- Add Rose's real phone number, email, and preferred contact method.
- Add the final booking platform URL or replace the draft booking form with the live booking integration.
- Add Rose's license number and any required Nevada massage/business disclosures.
- Confirm service area wording: studio address, by-appointment-only location, mobile service area, or private address policy.
- Add cancellation, late arrival, no-show, illness, and rescheduling policy.
- Confirm final prices, session lengths, and package availability.
- Add real accessibility details: parking, stairs/elevator, table height, restroom access, scent policy, and mobility accommodations.
- Add real testimonials only after Rose has permission to publish them.
- Add final production domain and canonical URLs.
- Generate the production sitemap after the domain is selected: `npm.cmd run sitemap -- --site-url=https://your-real-domain.com`.

## Verification Commands

- Prototype readiness: `npm.cmd run launch-check`
- Strict public-launch gate: `npm.cmd run launch-check:strict`
- Production build: `npm.cmd run build`
- Sitemap dry run: `npm.cmd run sitemap -- --site-url=https://your-real-domain.com --dry-run`

## Publish Workflow

1. Copy `docs/launch-facts.template.json` to `docs/launch-facts.json`.
2. Fill every field with real approved business facts, not placeholders.
3. Run `npm.cmd run launch-facts:apply` to render the real details into customer-facing pages and add canonical URLs / absolute social metadata.
4. Review the updated public pages, especially the First Visit guide, to confirm the copy is accurate and approved.
5. Run `npm.cmd run launch-check:strict`; it should fail if facts exist only in JSON but are not visible on the public site.
6. Run the production build and sitemap command before publishing.

## Recommended Trust Additions

- A short note from Rose about why she specializes in light-touch care.
- One or two verified credentials or continuing education notes.
- Review and approve the dedicated privacy and intake page before collecting real guest details.
- A confirmation workflow that lets Rose approve, decline, or request medical guidance before accepting a session.
- A first-visit email template that repeats pressure consent, positioning, scent, and provider-guidance reminders.

## Safety Copy To Preserve

- Massage is supportive care, not medical diagnosis or treatment.
- Guests can ask for less pressure, a pause, a skipped area, silence, guidance, or a position change at any time.
- Prenatal guests should share trimester, provider guidance, high-risk notes, unusual swelling, severe headache, dizziness, bleeding, blood-pressure concerns, or new severe pain.
- Lymphatic-style care should stay light and realistic; sudden, one-sided, hot, painful, severe, or unexplained swelling needs medical guidance.
- Recent surgery, infection signs, open wounds, clotting concerns, fever, and unexplained symptoms should be reviewed before massage.

## Current Prototype Strengths

- Premium nature-led brand direction with forest, water, wood, marble, and Rose Quartz warmth.
- Light-touch specialist positioning rather than generic spa language.
- Prenatal comfort, lymphatic flow, nervous-system reset, head and jaw care, restorative massage, ritual care, and special populations.
- Interactive Rose Session Map and Care Compass.
- 36-article journal library with health philosophy and service education.
- Dedicated care standards page for consent, privacy, medical scope, prenatal caution, and lymphatic safety.
- Dedicated privacy and intake page for body-map details, sensitive notes, and future AI-assisted summaries.
- Sitemap tooling that creates `public/sitemap.xml` and updates `public/robots.txt` once the real domain is available.
