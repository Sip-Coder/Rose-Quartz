import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict-launch");
const launchFactsPath = "docs/launch-facts.json";
const launchFactsTemplatePath = "docs/launch-facts.template.json";

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

const specialtyPages = [
  "prenatal-massage.html",
  "lymphatic-massage.html",
  "headache-jaw-massage.html",
  "sensitive-body-massage.html"
];

const trustPages = [
  "index.html",
  "first-visit.html",
  "care-standards.html",
  "privacy-intake.html",
  "pricing.html"
];

const requiredLaunchFacts = [
  { path: "business.phone", label: "real phone number" },
  { path: "business.email", label: "real email or booking contact method" },
  { path: "business.preferredContact", label: "preferred contact method" },
  { path: "business.bookingUrl", label: "final booking platform URL or production form endpoint", type: "url" },
  { path: "business.licenseNumber", label: "license number" },
  { path: "business.requiredDisclosures", label: "required Nevada disclosures" },
  { path: "business.serviceAreaOrAddressPolicy", label: "service area or address policy" },
  { path: "business.hours.summary", label: "hours" },
  { path: "business.policies.cancellation", label: "cancellation policy" },
  { path: "business.policies.lateArrival", label: "late-arrival policy" },
  { path: "business.policies.noShow", label: "no-show policy" },
  { path: "business.policies.illness", label: "illness policy" },
  { path: "business.policies.rescheduling", label: "rescheduling policy" },
  { path: "business.accessibility.parking", label: "parking details" },
  { path: "business.accessibility.stairsElevator", label: "stairs/elevator details" },
  { path: "business.accessibility.restroom", label: "restroom access" },
  { path: "business.accessibility.scentPolicy", label: "scent policy" },
  { path: "business.accessibility.mobility", label: "mobility accommodations" },
  { path: "seo.productionDomain", label: "production domain", type: "url" },
  { path: "seo.canonicalBaseUrl", label: "canonical base URL", type: "url" }
];

const errors = [];
const warnings = [];

for (const page of publicPages) {
  assertFile(page);
}

const packageJson = readJson("package.json");
assertScript(packageJson, "build");
assertScript(packageJson, "sitemap");
assertScript(packageJson, "launch-check");
assertFile(launchFactsTemplatePath);

const viteConfig = read("vite.config.js");
const sitemapScript = read("scripts/generate-sitemap.mjs");
for (const page of ["first-visit.html", ...specialtyPages]) {
  assertContains(viteConfig, page, `vite.config.js should include ${page} as a build input.`);
  assertContains(sitemapScript, page, `generate-sitemap should include ${page}.`);
}

for (const page of publicPages) {
  const html = read(page);
  assertNoPublicCopySmell(page, html);
  assertSocialImagesExist(page, html);
}

const pricing = read("pricing.html");
assertMissing(pricing, "data-pricing-mode", "pricing.html should not expose the membership toggle until terms are real.");
assertMissing(pricing, "data-member-price", "pricing.html should not expose member prices until terms are real.");
assertMissing(pricing, "Monthly member session", "pricing.html should not expose member-price labels until terms are real.");

const home = read("index.html");
assertContains(home, "Preview request details", "Homepage form should be labeled as a preview while no live booking integration exists.");
assertContains(read("assets/js/site.js"), "Request preview", "Booking JS output should be transparent that this is a request preview.");

for (const page of specialtyPages) {
  const html = read(page);
  assertContains(html, "service-planning", `${page} should include session-length conversion guidance.`);
  assertContains(html, "One-time session:", `${page} should include visible price context.`);
  assertContains(html, "quick-booking-bar", `${page} should include mobile quick actions.`);
}

validateLaunchFacts();

for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

if (errors.length) {
  for (const error of errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

console.log(`Launch readiness check passed with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`);

function assertFile(relPath) {
  if (!existsSync(join(rootDir, relPath))) {
    errors.push(`Missing required file: ${relPath}`);
  }
}

function read(relPath) {
  return readFileSync(join(rootDir, relPath), "utf8");
}

function readJson(relPath) {
  return JSON.parse(read(relPath));
}

function assertScript(packageJson, scriptName) {
  if (!packageJson.scripts?.[scriptName]) {
    errors.push(`package.json is missing script: ${scriptName}`);
  }
}

function assertContains(text, needle, message) {
  if (!text.includes(needle)) {
    errors.push(message);
  }
}

function assertMissing(text, needle, message) {
  if (text.includes(needle)) {
    errors.push(message);
  }
}

function assertNoPublicCopySmell(page, html) {
  const copySmells = [
    "Book a session",
    "Request a booking",
    "competitors",
    "public launch",
    "before launch",
    "launch still",
    "should be visible"
  ];

  for (const smell of copySmells) {
    if (html.toLowerCase().includes(smell.toLowerCase())) {
      errors.push(`${page} still contains public-facing internal or live-booking copy: ${smell}`);
    }
  }

  if (/<a\b[^>]*>\s*Booking\s*<\/a>/i.test(html)) {
    errors.push(`${page} still uses Booking as a visible navigation label.`);
  }
}

function assertSocialImagesExist(page, html) {
  const imageMatches = html.matchAll(/<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content="([^"]+)"/g);

  for (const match of imageMatches) {
    const src = match[1];
    if (!src.startsWith("/")) continue;
    const filePath = src.replace(/^\/+/, "");
    if (!existsSync(join(rootDir, filePath))) {
      errors.push(`${page} references missing social image: ${src}`);
    }
  }
}

function validateLaunchFacts() {
  const factsFileExists = existsSync(join(rootDir, launchFactsPath));
  if (!factsFileExists) {
    const message = `Create ${launchFactsPath} from ${launchFactsTemplatePath} with real public business details.`;
    if (strict) {
      errors.push(`Strict launch blocker: ${message}`);
    } else {
      warnings.push(message);
    }

    for (const fact of requiredLaunchFacts) {
      addLaunchFactIssue(fact.label);
    }
    addLaunchFactIssue("approved testimonials or review links");
    addLaunchFactIssue("final room/practitioner/arrival photography");
    return;
  }

  let facts;
  try {
    facts = readJson(launchFactsPath);
  } catch (error) {
    errors.push(`${launchFactsPath} is not valid JSON: ${error.message}`);
    return;
  }

  for (const fact of requiredLaunchFacts) {
    const value = getByPath(facts, fact.path);
    if (!hasText(value)) {
      addLaunchFactIssue(fact.label);
      continue;
    }

    if (fact.type === "url" && !isProductionUrl(value)) {
      addLaunchFactIssue(`${fact.label} must be a real http(s) URL, not localhost or example data`);
    }
  }

  const hasApprovedTestimonials = facts.proof?.testimonialsApproved === true;
  const reviewLinks = Array.isArray(facts.proof?.reviewLinks) ? facts.proof.reviewLinks : [];
  if (!hasApprovedTestimonials && !reviewLinks.some(isProductionUrl)) {
    addLaunchFactIssue("approved testimonials or review links");
  }

  const photoAssets = Array.isArray(facts.proof?.photoAssets) ? facts.proof.photoAssets : [];
  if (!photoAssets.some(assetExists)) {
    addLaunchFactIssue("final room/practitioner/arrival photography");
  }

  if (strict) {
    assertLaunchFactsArePublic(facts);
  }
}

function addLaunchFactIssue(label) {
  const message = `Launch fact still needed: ${label}.`;
  if (strict) {
    errors.push(`Strict launch blocker: add ${label}.`);
  } else {
    warnings.push(message);
  }
}

function getByPath(value, path) {
  return path.split(".").reduce((current, key) => current?.[key], value);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isProductionUrl(value) {
  if (!hasText(value)) return false;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "example.com", "www.example.com"]);
  return ["https:", "http:"].includes(parsed.protocol) && !blockedHosts.has(parsed.hostname.toLowerCase()) && !parsed.hostname.endsWith(".local");
}

function assetExists(value) {
  if (!hasText(value)) return false;
  const relPath = value.replace(/^\/+/, "");
  return existsSync(join(rootDir, relPath));
}

function assertLaunchFactsArePublic(facts) {
  const trustHtml = trustPages.map((page) => read(page)).join("\n");
  const allHtml = publicPages.map((page) => read(page)).join("\n");

  assertValueRendered("phone number", facts.business?.phone, trustHtml, { phone: true });
  assertValueRendered("email address", facts.business?.email, trustHtml);
  assertValueRendered("preferred contact method", facts.business?.preferredContact, trustHtml);
  assertValueRendered("booking URL", facts.business?.bookingUrl, allHtml);
  assertValueRendered("license number", facts.business?.licenseNumber, trustHtml);
  assertValueRendered("required disclosures", facts.business?.requiredDisclosures, trustHtml);
  assertValueRendered("service area or address policy", facts.business?.serviceAreaOrAddressPolicy, trustHtml);
  assertValueRendered("hours", facts.business?.hours?.summary, trustHtml);
  assertValueRendered("cancellation policy", facts.business?.policies?.cancellation, trustHtml);
  assertValueRendered("late-arrival policy", facts.business?.policies?.lateArrival, trustHtml);
  assertValueRendered("no-show policy", facts.business?.policies?.noShow, trustHtml);
  assertValueRendered("illness policy", facts.business?.policies?.illness, trustHtml);
  assertValueRendered("rescheduling policy", facts.business?.policies?.rescheduling, trustHtml);
  assertValueRendered("parking details", facts.business?.accessibility?.parking, trustHtml);
  assertValueRendered("stairs/elevator details", facts.business?.accessibility?.stairsElevator, trustHtml);
  assertValueRendered("restroom access", facts.business?.accessibility?.restroom, trustHtml);
  assertValueRendered("scent policy", facts.business?.accessibility?.scentPolicy, trustHtml);
  assertValueRendered("mobility accommodations", facts.business?.accessibility?.mobility, trustHtml);

  const reviewLinks = Array.isArray(facts.proof?.reviewLinks) ? facts.proof.reviewLinks : [];
  if (reviewLinks.length && !reviewLinks.some((link) => includesNormalized(allHtml, link))) {
    errors.push("Strict launch blocker: at least one review link from launch facts must appear on a public page.");
  }

  if (hasText(facts.proof?.testimonialSource)) {
    assertValueRendered("testimonial source", facts.proof.testimonialSource, allHtml);
  }

  const photoAssets = Array.isArray(facts.proof?.photoAssets) ? facts.proof.photoAssets : [];
  if (photoAssets.length && !photoAssets.some((asset) => includesNormalized(allHtml, asset))) {
    errors.push("Strict launch blocker: at least one final photo asset from launch facts must appear on a public page.");
  }

  if (hasText(facts.seo?.canonicalBaseUrl)) {
    for (const page of publicPages) {
      const html = read(page);
      if (!includesNormalized(html, facts.seo.canonicalBaseUrl)) {
        errors.push(`${page} must include the canonical base URL from launch facts.`);
      }
    }
  }
}

function assertValueRendered(label, value, html, options = {}) {
  if (!hasText(value)) return;

  if (options.phone) {
    const expectedDigits = value.replace(/\D/g, "");
    const pageDigits = html.replace(/\D/g, "");
    if (expectedDigits.length >= 7 && pageDigits.includes(expectedDigits)) return;
  }

  if (!includesNormalized(html, value)) {
    errors.push(`Strict launch blocker: ${label} is present in launch facts but not visible on required public pages.`);
  }
}

function includesNormalized(haystack, needle) {
  if (!hasText(needle)) return false;
  return normalizeText(haystack).includes(normalizeText(needle));
}

function normalizeText(value) {
  return String(value).replace(/\s+/g, " ").trim().toLowerCase();
}
