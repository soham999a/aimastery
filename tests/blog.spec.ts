import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("should display blog page with title", async ({ page }) => {
    await expect(page.getByText(/AI Tips, Tutorials/i)).toBeVisible();
  });

  test("should display blog posts", async ({ page }) => {
    const posts = page.locator('a[href*="/blog/"]');
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show featured post", async ({ page }) => {
    await expect(page.getByText(/featured/i).or(page.getByText(/top 100 ai tools/i)).first()).toBeVisible();
  });

  test("should have category pills", async ({ page }) => {
    const categories = page.getByText(/AI Tools|Prompt Engineering|Career|Automation|Data Analytics|Students/);
    await expect(categories.first()).toBeVisible();
  });

  test("should navigate to a blog post page", async ({ page }) => {
    const firstPost = page.locator('a[href*="/blog/"]').first();
    if (await firstPost.isVisible()) {
      await firstPost.click();
      await expect(page).toHaveURL(/\/blog\//);
    }
  });
});
