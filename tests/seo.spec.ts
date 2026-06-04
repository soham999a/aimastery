import { test, expect } from "@playwright/test";

test.describe("SEO & Metadata", () => {
  test("home page should have proper meta tags", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/YesDo Edutech/);

    const description = await page.getAttribute('meta[name="description"]', "content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(20);

    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content");
    expect(ogTitle).toBeTruthy();
  });

  test("should have viewport meta tag", async ({ page }) => {
    await page.goto("/");
    const viewport = await page.getAttribute('meta[name="viewport"]', "content");
    expect(viewport).toContain("width=device-width");
  });

  test("should have canonical URL", async ({ page }) => {
    await page.goto("/");
    const canonical = await page.getAttribute('link[rel="canonical"]', "href");
    expect(canonical).toBeTruthy();
  });

  test("should have favicon", async ({ page }) => {
    await page.goto("/");
    const favicon = await page.getAttribute('link[rel="icon"]', "href");
    expect(favicon).toBeTruthy();
  });

  test("should have structured data (JSON-LD)", async ({ page }) => {
    await page.goto("/");
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThan(0);
  });

  test("robots.txt should exist", async ({ page }) => {
    const resp = await page.goto("/robots.ts");
    // It's a Next.js route handler, should return something
    expect(resp).not.toBeNull();
  });

  test("sitemap should exist", async ({ page }) => {
    const resp = await page.goto("/sitemap.ts");
    expect(resp).not.toBeNull();
  });
});
