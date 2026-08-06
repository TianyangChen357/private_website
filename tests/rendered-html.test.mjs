import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const routes = [
  ["/", "Building spatial", 'href="/research"'],
  ["/research", "How I study", 'aria-current="page"'],
  ["/work", "Research made", 'aria-current="page"'],
  ["/trajectory", "From measurement to", 'aria-current="page"'],
  ["/publications", "Ideas, methods", 'aria-current="page"'],
  ["/teaching", "Learn by doing", 'aria-current="page"'],
];

test("renders every portfolio route with its own content and working links", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const [pathname, heading, routeMarker] of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${pathname}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200, pathname);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      pathname,
    );
    const html = await response.text();
    assert.match(html, developmentPreviewMeta, pathname);
    assert.match(html, new RegExp(heading), pathname);
    assert.match(html, new RegExp(routeMarker), pathname);
  }
});

test("navigation keeps native route behavior as a no-JavaScript fallback", async () => {
  const source = await readFile(new URL("../components/PortfolioExperience.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /preventDefault\s*\(/);
  assert.doesNotMatch(source, /history\.pushState\s*\(/);
  assert.match(source, /<a href=\{destination\}/);
});
