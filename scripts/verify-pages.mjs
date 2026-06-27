/**
 * Static server (GitHub Pages-style /play/:id → 404.html) + Playwright console audit.
 * Usage: node scripts/verify-pages.mjs
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const port = 8765;
const base = `http://127.0.0.1:${port}`;

const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".json": "image/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webmanifest": "application/manifest+json",
};

function routePath(urlPath) {
  if (/^\/play\/\d{6}\/?$/i.test(urlPath)) return "/404.html";
  if (urlPath === "/") return "/index.html";
  if (urlPath.endsWith("/") && urlPath !== "/") {
    const trimmed = urlPath.replace(/\/+$/, "");
    return trimmed + "/index.html";
  }
  return urlPath;
}

const server = createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url || "/", base).pathname;
    const rel = routePath(urlPath);
    const filePath = join(root, ...rel.replace(/^\//, "").split("/"));
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    try {
      const data = await readFile(join(root, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data);
    } catch (e) {
      res.writeHead(500).end(String(e));
    }
  }
});

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const pages = [
  { path: "/", name: "home" },
  { path: "/contact.html", name: "contact" },
  { path: "/play/123456", name: "play-invite" },
];

const browser = await chromium.launch();
const results = [];

for (const page of pages) {
  const context = await browser.newContext();
  const pg = await context.newPage();
  const errors = [];
  const pageErrors = [];

  pg.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  pg.on("pageerror", (err) => pageErrors.push(String(err)));

  await pg.goto(base + page.path, { waitUntil: "networkidle" });

  const gtagCount = await pg.locator('script[src*="gtag-init.js"]').count();
  const analyticsCount = await pg.locator('script[src*="analytics.js"]').count();
  const chessBirdSite = await pg.evaluate(() => typeof window.ChessBirdSite !== "undefined");
  const analyticsState = await pg.evaluate(() => window.ChessBirdAnalyticsState || null);

  results.push({
    page: page.name,
    url: page.path,
    gtagInitScripts: gtagCount,
    analyticsScripts: analyticsCount,
    chessBirdSite,
    analyticsState,
    consoleErrors: errors,
    pageErrors,
  });

  await context.close();
}

await browser.close();
server.close();

console.log(JSON.stringify(results, null, 2));

const failed = results.some(
  (r) =>
    r.gtagInitScripts > 1 ||
    r.analyticsScripts > 1 ||
    r.consoleErrors.length > 0 ||
    r.pageErrors.length > 0
);

process.exit(failed ? 1 : 0);
