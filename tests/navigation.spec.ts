import { test, expect } from "@playwright/test";

test.describe("Navigation & Global Elements", () => {
  test("should navigate from home to all major pages", async ({ page }) => {
    const pages = [
      { path: "/", label: "Home" },
      { path: "/courses", label: "Courses" },
      { path: "/blog", label: "Blog" },
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact" },
      { path: "/workshop", label: "Workshop" },
      { path: "/login", label: "Login" },
      { path: "/signup", label: "Signup" },
      { path: "/privacy", label: "Privacy" },
    ];

    for (const p of pages) {
      await page.goto(p.path);
      const status = await page.evaluate(() => document.readyState);
      expect(status).toBe("complete");
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test("all pages should return 200 status", async ({ page }) => {
    const routes = ["/", "/courses", "/blog", "/about", "/contact", "/workshop", "/login", "/signup", "/privacy"];
    for (const route of routes) {
      const resp = await page.goto(route);
      expect(resp?.status()).toBe(200);
    }
  });

  test("404 page should work", async ({ page }) => {
    const resp = await page.goto("/nonexistent-page-xyz");
    expect(resp?.status()).toBe(404);
  });
});
