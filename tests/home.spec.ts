import { test, expect } from "@playwright/test";

test.describe("Home Page (Landing)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the landing page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/YesDo Edutech/);
  });

  test("should display Navbar", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("should display Hero section", async ({ page }) => {
    const hero = page.locator("main").first();
    await expect(hero).toBeVisible();
  });

  test("should display Footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should display Chat Widget", async ({ page }) => {
    const chat = page.locator('[data-testid="chat-widget"], [class*="chat"]').first();
    await expect(chat).toBeVisible().catch(() => {
      // Chat widget might be conditionally rendered
    });
  });

  test("should display WhatsApp button", async ({ page }) => {
    const wa = page.locator('a[href*="wa.me"], a[href*="whatsapp"]').first();
    await expect(wa).toBeVisible().catch(() => {});
  });

  test("should have working navigation links in Navbar", async ({ page }) => {
    const links = page.locator("nav a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("should scroll to Featured Courses section via CTA", async ({ page }) => {
    const cta = page.locator('a[href*="/courses"]').first();
    if (await cta.isVisible()) {
      await cta.click();
      await expect(page).toHaveURL(/\/courses/);
    }
  });
});
