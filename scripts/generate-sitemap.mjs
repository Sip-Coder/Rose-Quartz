import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(rootDir, "public");
const sitemapPath = join(publicDir, "sitemap.xml");
const robotsPath = join(publicDir, "robots.txt");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const siteUrlArg = readOption("--site-url");
const rawSiteUrl = siteUrlArg || process.env.SITE_URL;

if (!rawSiteUrl) {
  fail(
    "Missing production domain. Set SITE_URL or pass --site-url, for example: npm run sitemap -- --site-url=https://rosequartzmassage.com"
  );
}

const siteUrl = normalizeSiteUrl(rawSiteUrl);
const urls = collectPages().map((page) => toSitemapEntry(page, siteUrl));
const xml = renderSitemap(urls);

if (dryRun) {
  console.log(`Dry run OK: ${urls.length} URLs would be written for ${siteUrl.href}`);
  process.exit(0);
}

mkdirSync(publicDir, { recursive: true });
writeFileSync(sitemapPath, xml, "utf8");
writeFileSync(robotsPath, renderRobots(siteUrl), "utf8");

console.log(`Wrote ${relative(rootDir, sitemapPath)} with ${urls.length} URLs.`);
console.log(`Updated ${relative(rootDir, robotsPath)} with Sitemap: ${new URL("/sitemap.xml", siteUrl).href}`);

function readOption(name) {
  const direct = args.find((arg) => arg.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);

  const index = args.indexOf(name);
  if (index !== -1) return args[index + 1];

  return "";
}

function normalizeSiteUrl(value) {
  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    fail(`Invalid site URL: ${value}`);
  }

  if (!["https:", "http:"].includes(parsed.protocol)) {
    fail("SITE_URL must start with http:// or https://.");
  }

  const hostname = parsed.hostname.toLowerCase();
  const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "example.com", "www.example.com"]);
  if (blockedHosts.has(hostname) || hostname.endsWith(".local")) {
    fail("Use the real production domain, not localhost, .local, or example.com.");
  }

  parsed.hash = "";
  parsed.search = "";
  parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return parsed;
}

function collectPages() {
  const rootPages = [
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
  ].map((file) => resolve(rootDir, file));

  const journalDir = join(rootDir, "journal");
  const journalPages = readdirSync(journalDir)
    .filter((file) => file.endsWith(".html"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => join(journalDir, file));

  return [...rootPages, ...journalPages].filter((file) => existsSync(file));
}

function toSitemapEntry(filePath, siteUrl) {
  const relPath = relative(rootDir, filePath).split(sep).join("/");
  const urlPath = relPath === "index.html" ? "/" : `/${relPath}`;

  return {
    loc: new URL(urlPath, siteUrl).href,
    lastmod: statSync(filePath).mtime.toISOString().slice(0, 10),
    priority: priorityFor(relPath),
    changefreq: relPath.startsWith("journal/") ? "monthly" : relPath === "journal.html" ? "weekly" : "monthly"
  };
}

function priorityFor(relPath) {
  if (relPath === "index.html") return "1.0";
  if (relPath === "services.html") return "0.9";
  if (relPath === "pricing.html") return "0.9";
  if (relPath === "first-visit.html") return "0.85";
  if (relPath.endsWith("-massage.html")) return "0.85";
  if (relPath === "journal.html") return "0.8";
  if (relPath === "care-standards.html") return "0.7";
  if (relPath === "privacy-intake.html") return "0.7";
  return "0.6";
}

function renderSitemap(entries) {
  const body = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function renderRobots(siteUrl) {
  const existing = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "User-agent: *\nAllow: /\n";
  const sitemapLine = `Sitemap: ${new URL("/sitemap.xml", siteUrl).href}`;
  const lines = existing
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("Sitemap:") && !line.includes("Example: Sitemap:"));

  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  return `${lines.join("\n")}\n\n${sitemapLine}\n`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
