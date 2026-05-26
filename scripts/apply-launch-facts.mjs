import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const factsPath = join(rootDir, "docs", "launch-facts.json");

const publicPages = [
  "index.html",
  "services.html",
  "pricing.html",
  "first-visit.html",
  "prenatal-massage.html",
  "lymphatic-massage.html",
  "headache-jaw-massage.html",
  "sensitive-body-massage.html",
  "care-standards.html",
  "privacy-intake.html",
  "journal.html"
];

if (!existsSync(factsPath)) {
  fail("Missing docs/launch-facts.json. Copy docs/launch-facts.template.json and fill it with real approved business facts first.");
}

const facts = JSON.parse(readFileSync(factsPath, "utf8"));
const canonicalBaseUrl = normalizeBaseUrl(required(facts.seo?.canonicalBaseUrl, "seo.canonicalBaseUrl"));

applyVerifiedDetails(facts);
applyCanonicalUrls(canonicalBaseUrl);

console.log("Applied launch facts to public pages.");

function applyVerifiedDetails(data) {
  const pagePath = join(rootDir, "first-visit.html");
  const html = readFileSync(pagePath, "utf8");
  const section = renderVerifiedDetails(data);
  const next = replaceBetweenMarkers(html, "LAUNCH_FACTS", section);
  writeFileSync(pagePath, next, "utf8");
}

function applyCanonicalUrls(baseUrl) {
  for (const page of publicPages) {
    const pagePath = join(rootDir, page);
    const html = readFileSync(pagePath, "utf8");
    const url = page === "index.html" ? baseUrl : `${baseUrl}/${page}`;
    const imageUrl = absoluteImageUrl(baseUrl, firstSocialImage(html));

    let next = html
      .replace(/\s*<link\s+rel="canonical"\s+href="[^"]*">\s*/i, "\n")
      .replace(/\s*<meta\s+property="og:url"\s+content="[^"]*">\s*/i, "\n")
      .replace(/(<meta\s+property="og:type"\s+content="[^"]+">)/i, `$1\n    <meta property="og:url" content="${escapeAttribute(url)}">`)
      .replace(/<meta\s+property="og:image"\s+content="([^"]*)">/i, `<meta property="og:image" content="${escapeAttribute(imageUrl)}">`)
      .replace(/<meta\s+name="twitter:image"\s+content="([^"]*)">/i, `<meta name="twitter:image" content="${escapeAttribute(imageUrl)}">`);

    next = next.replace(/(\s*<link\s+rel="stylesheet")/i, `\n    <link rel="canonical" href="${escapeAttribute(url)}">$1`);
    writeFileSync(pagePath, next, "utf8");
  }
}

function renderVerifiedDetails(data) {
  const business = data.business || {};
  const policies = business.policies || {};
  const accessibility = business.accessibility || {};
  const proof = data.proof || {};
  const reviewLinks = Array.isArray(proof.reviewLinks) ? proof.reviewLinks : [];
  const photoAssets = Array.isArray(proof.photoAssets) ? proof.photoAssets : [];

  const contactRows = [
    ["Phone", linkPhone(required(business.phone, "business.phone"))],
    ["Email", linkEmail(required(business.email, "business.email"))],
    ["Preferred contact", text(required(business.preferredContact, "business.preferredContact"))],
    ["Request care", `<a href="${escapeAttribute(requiredUrl(business.bookingUrl, "business.bookingUrl"))}">Open booking</a>`],
    ["Hours", text(required(business.hours?.summary, "business.hours.summary"))],
    ["Service area", text(required(business.serviceAreaOrAddressPolicy, "business.serviceAreaOrAddressPolicy"))],
    ["License", text(required(business.licenseNumber, "business.licenseNumber"))],
    ["Disclosure", text(required(business.requiredDisclosures, "business.requiredDisclosures"))]
  ];

  const policyRows = [
    ["Cancellation", text(required(policies.cancellation, "business.policies.cancellation"))],
    ["Late arrival", text(required(policies.lateArrival, "business.policies.lateArrival"))],
    ["No-show", text(required(policies.noShow, "business.policies.noShow"))],
    ["Illness", text(required(policies.illness, "business.policies.illness"))],
    ["Rescheduling", text(required(policies.rescheduling, "business.policies.rescheduling"))]
  ];

  const accessRows = [
    ["Parking", text(required(accessibility.parking, "business.accessibility.parking"))],
    ["Stairs/elevator", text(required(accessibility.stairsElevator, "business.accessibility.stairsElevator"))],
    ["Restroom", text(required(accessibility.restroom, "business.accessibility.restroom"))],
    ["Scent policy", text(required(accessibility.scentPolicy, "business.accessibility.scentPolicy"))],
    ["Mobility", text(required(accessibility.mobility, "business.accessibility.mobility"))]
  ];

  return `      <section class="service-detail-card launch-facts-panel" aria-labelledby="verified-details-title">
        <div>
          <p class="eyebrow">Verified details</p>
          <h2 id="verified-details-title">The practical details are ready before you request care.</h2>
          <p>These are the current public details Rose Quartz uses for contact, booking, accessibility, policies, and required disclosures.</p>
          ${renderReviewProof(proof, reviewLinks)}
        </div>
        <div class="service-detail-side">
          ${renderDefinitionList(contactRows)}
        </div>
      </section>

      <section class="service-detail-card launch-facts-panel" aria-labelledby="policy-details-title">
        <div>
          <p class="eyebrow">Policies and accessibility</p>
          <h2 id="policy-details-title">Know the boundaries before appointment time.</h2>
          ${renderPhotoAssets(photoAssets)}
        </div>
        <div class="service-detail-side">
          ${renderDefinitionList([...policyRows, ...accessRows])}
        </div>
      </section>`;
}

function renderReviewProof(proof, reviewLinks) {
  if (proof.testimonialsApproved !== true && !reviewLinks.length) {
    fail("proof.testimonialsApproved must be true or proof.reviewLinks must include at least one real review URL.");
  }

  const source = proof.testimonialSource ? `<p>${text(proof.testimonialSource)}</p>` : "";
  const links = reviewLinks.map((url, index) => `<a href="${escapeAttribute(requiredUrl(url, `proof.reviewLinks[${index}]`))}">Review link ${index + 1}</a>`).join("");
  return `${source}${links ? `<div class="mapping-actions">${links}</div>` : ""}`;
}

function renderPhotoAssets(photoAssets) {
  if (!photoAssets.length) {
    fail("proof.photoAssets must include at least one final public photo path.");
  }

  return `<div class="launch-photo-grid">${photoAssets
    .map((src, index) => {
      const relPath = String(src).replace(/^\/+/, "");
      if (!existsSync(join(rootDir, relPath))) {
        fail(`proof.photoAssets[${index}] does not exist: ${src}`);
      }
      return `<img src="${escapeAttribute(src)}" alt="">`;
    })
    .join("")}</div>`;
}

function renderDefinitionList(rows) {
  return `<dl>
${rows.map(([term, description]) => `            <div><dt>${escapeHtml(term)}</dt><dd>${description}</dd></div>`).join("\n")}
          </dl>`;
}

function replaceBetweenMarkers(html, marker, replacement) {
  const pattern = new RegExp(`(\\s*<!-- ${marker}_START -->)([\\s\\S]*?)(\\s*<!-- ${marker}_END -->)`);
  if (!pattern.test(html)) {
    fail(`Missing ${marker}_START / ${marker}_END markers.`);
  }
  return html.replace(pattern, `$1\n${replacement}\n      $3`);
}

function firstSocialImage(html) {
  const match = html.match(/<meta\s+property="og:image"\s+content="([^"]*)">/i);
  return match?.[1] || "/assets/images/rose-sanctuary-hero.jpg";
}

function absoluteImageUrl(baseUrl, src) {
  if (/^https?:\/\//i.test(src)) return src;
  return `${baseUrl}/${src.replace(/^\/+/, "")}`;
}

function normalizeBaseUrl(value) {
  const parsed = new URL(requiredUrl(value, "seo.canonicalBaseUrl"));
  parsed.hash = "";
  parsed.search = "";
  parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  return parsed.href.replace(/\/+$/, "");
}

function required(value, path) {
  if (typeof value !== "string" || !value.trim()) {
    fail(`Missing required launch fact: ${path}`);
  }
  return value.trim();
}

function requiredUrl(value, path) {
  const textValue = required(value, path);
  let parsed;
  try {
    parsed = new URL(textValue);
  } catch {
    fail(`Launch fact must be a valid URL: ${path}`);
  }

  const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "example.com", "www.example.com"]);
  if (!["https:", "http:"].includes(parsed.protocol) || blockedHosts.has(parsed.hostname.toLowerCase()) || parsed.hostname.endsWith(".local")) {
    fail(`Launch fact must be a real production URL: ${path}`);
  }

  return textValue;
}

function linkPhone(value) {
  const digits = value.replace(/\D/g, "");
  const href = digits.length === 11 && digits.startsWith("1") ? `+${digits}` : `+1${digits}`;
  return `<a href="tel:${escapeAttribute(href)}">${escapeHtml(value)}</a>`;
}

function linkEmail(value) {
  return `<a href="mailto:${escapeAttribute(value)}">${escapeHtml(value)}</a>`;
}

function text(value) {
  return escapeHtml(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
