import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should display contact page", async ({ page }) => {
    await expect(page.getByText(/we'd love to hear from you/i)).toBeVisible();
  });

  test("should show contact information", async ({ page }) => {
    await expect(page.getByText(/contact@yesdo\.co\.in/i).first()).toBeVisible();
    await expect(page.getByText(/\+91 78900 18776/i).first()).toBeVisible();
    await expect(page.getByText(/kolkata/i).first()).toBeVisible();
  });

  test("should display contact form", async ({ page }) => {
    await expect(page.getByText(/send us a message/i)).toBeVisible();
    await expect(page.locator('input[placeholder*="Your name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="How can we help"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
  });

  test("should show success message after form submission", async ({ page }) => {
    await page.locator('input[placeholder*="Your name"]').fill("Test User");
    await page.locator('input[type="email"]').first().fill("test@example.com");
    await page.locator('input[placeholder*="How can we help"]').fill("Test Subject");
    await page.locator('textarea').fill("This is a test message from Playwright.");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 15000 });
  });

  test("should have social media links", async ({ page }) => {
    const socialLinks = page.locator('a[target="_blank"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have school/enterprise section", async ({ page }) => {
    await expect(page.getByText(/school \/ enterprise plans/i)).toBeVisible();
  });
});
