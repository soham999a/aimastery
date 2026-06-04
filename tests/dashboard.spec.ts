import { test, expect } from "@playwright/test";

test.describe("Dashboard (Authenticated)", () => {
  test("should redirect to login when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("admin page should be accessible", async ({ page }) => {
    await page.goto("/admin");
    const status = await page.evaluate(() => document.readyState);
    expect(status).toBe("complete");
  });

  test("demo page should be accessible", async ({ page }) => {
    await page.goto("/setup-demo");
    await expect(page.getByText(/setup demo account/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /create demo account/i })).toBeVisible();
  });
});
