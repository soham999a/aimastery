import { test, expect } from "@playwright/test";

test.describe("Privacy Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/privacy");
  });

  test("should display privacy policy page", async ({ page }) => {
    await expect(page.getByText(/privacy policy/i).or(page.getByText(/Privacy Policy/)).first()).toBeVisible();
  });

  test("should have content sections", async ({ page }) => {
    const body = page.locator("main, article");
    const text = await body.innerText();
    expect(text.length).toBeGreaterThan(100);
  });
});
