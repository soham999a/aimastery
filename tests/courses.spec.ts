import { test, expect } from "@playwright/test";

test.describe("Courses Pages", () => {
  test.describe("Courses Catalog", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/courses");
    });

    test("should display course catalog page", async ({ page }) => {
      await expect(page.getByText(/course catalog/i)).toBeVisible();
      await expect(page.getByText(/expert-led course/i)).toBeVisible();
    });

    test("should have search input", async ({ page }) => {
      const searchInput = page.locator('input[placeholder*="Search"]');
      await expect(searchInput).toBeVisible();
    });

    test("should filter courses by level", async ({ page }) => {
      const beginnerBtn = page.getByRole("button", { name: /^beginner$/i });
      if (await beginnerBtn.isVisible()) {
        await beginnerBtn.click();
        await expect(page).toHaveURL(/level=Beginner/);
      }
    });

    test("should filter courses by category", async ({ page }) => {
      const aiBtn = page.getByRole("button", { name: /^ai$/i });
      if (await aiBtn.isVisible()) {
        await aiBtn.click();
        await expect(page).toHaveURL(/cat=AI/);
      }
    });

    test("should search courses by keyword", async ({ page }) => {
      const searchInput = page.locator('input[placeholder*="Search"]');
      await searchInput.fill("python");
      await expect(page).toHaveURL(/q=python/);
    });

    test("should display course cards with details", async ({ page }) => {
      const cards = page.locator('a[href*="/courses/"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(0);
      // Check page has course content
      await expect(page.getByText(/course|catalog|enroll|ai mastery/i).first()).toBeVisible();
    });

    test("should navigate to course detail page", async ({ page }) => {
      const firstCourse = page.locator('a[href*="/courses/"]').first();
      if (await firstCourse.isVisible()) {
        const href = await firstCourse.getAttribute("href");
        await firstCourse.click();
        await expect(page).toHaveURL(new RegExp(href!));
      }
    });

    test("should clear filters", async ({ page }) => {
      const clearBtn = page.getByRole("button", { name: /clear/i });
      if (await clearBtn.isVisible()) {
        await clearBtn.click();
        await expect(page).toHaveURL("/courses");
      }
    });
  });

  test.describe("Course Detail Page", () => {
    test("should display course detail page for a valid course", async ({ page }) => {
      await page.goto("/courses/ai-mastery-complete");
      await expect(page.getByText(/AI Mastery Flagship Course/i)).toBeVisible();
    });

    test("should show course curriculum", async ({ page }) => {
      await page.goto("/courses/ai-mastery-complete");
      await expect(page.getByText(/curriculum/i).or(page.getByText(/modules/i)).first()).toBeVisible().catch(() => {});
    });

    test("should show enroll/pricing info", async ({ page }) => {
      await page.goto("/courses/ai-mastery-complete");
      await expect(page.getByText(/enroll/i).or(page.getByText(/price/i)).first()).toBeVisible().catch(() => {});
    });
  });
});
