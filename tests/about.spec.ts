import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display about page", async ({ page }) => {
    await expect(page.getByText(/every student deserves/i)).toBeVisible();
  });

  test("should show stats section", async ({ page }) => {
    await expect(page.getByText("1,200+").first()).toBeVisible();
    await expect(page.getByText(/students trained/i)).toBeVisible();
  });

  test("should show mission section", async ({ page }) => {
    await expect(page.getByText(/our mission/i)).toBeVisible();
  });

  test("should show values section", async ({ page }) => {
    await expect(page.getByText(/what we stand for/i)).toBeVisible();
  });

  test("should show team section", async ({ page }) => {
    await expect(page.getByText(/the team behind yesdo/i)).toBeVisible();
    await expect(page.getByText(/debapriya ghosal/i)).toBeVisible();
  });

  test("should show certification section", async ({ page }) => {
    await expect(page.getByText(/industry certifications/i)).toBeVisible();
  });

  test("should show community section", async ({ page }) => {
    await expect(page.getByText(/live community access/i)).toBeVisible();
  });

  test("should have CTA links to courses", async ({ page }) => {
    const browseBtn = page.getByRole("link", { name: /browse courses/i });
    await expect(browseBtn).toBeVisible();
    await browseBtn.click();
    await expect(page).toHaveURL(/\/courses/);
  });

  test("should have link to workshop page", async ({ page }) => {
    const workshopBtn = page.getByRole("link", { name: /join workshop/i });
    await expect(workshopBtn).toBeVisible();
  });
});
