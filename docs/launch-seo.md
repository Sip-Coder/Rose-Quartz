# Launch SEO Notes

The site now has local-friendly metadata, a manifest, a favicon, robots rules, sitemap generation tooling, and JSON-LD structured data. Do not hardcode a fake production domain while the final URL is unknown.

Before launch, choose the canonical domain, add the real facts to `docs/launch-facts.json`, and run `npm.cmd run launch-facts:apply`. Then confirm:

- Canonical URLs on every page.
- Absolute `og:url`, `og:image`, structured-data `url`, and structured-data `image` values.
- A production `sitemap.xml` with absolute URLs by running `npm.cmd run sitemap -- --site-url=https://your-real-domain.com`.
- A `Sitemap:` line in `public/robots.txt`, which the sitemap script updates when it runs.
- Rose's real contact information, business license details, address or service-area language, and booking platform URL.

The sitemap script intentionally fails without a real domain, and rejects localhost and example domains so the launch output does not accidentally ship placeholder SEO data.
The strict launch verifier also rejects missing or placeholder launch facts and checks that real facts from `docs/launch-facts.json` appear in public pages: `npm.cmd run launch-check:strict`.
