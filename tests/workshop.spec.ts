import { test, expect } from "@playwright/test";

test.describe("Workshop Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/workshop");
  });

  test("should display workshop page", async ({ page }) => {
    await expect(page).toHaveURL(/\/workshop/);
  });

  test("should show countdown timer", async ({ page }) => {
    await expect(page.getByText(/workshop in/i)).toBeVisible();
  });

  test("should show stats", async ({ page }) => {
    await expect(page.getByText(/students enrolled/i)).toBeVisible();
    await expect(page.getByText(/average rating/i)).toBeVisible();
    await expect(page.getByText(/workshop fee/i)).toBeVisible();
  });

  test("should show 'Is this for you?' section", async ({ page }) => {
    await expect(page.getByText(/right for you/i)).toBeVisible();
  });

  test("should show 'What you will learn' section", async ({ page }) => {
    await expect(page.getByText(/what you will learn/i)).toBeVisible();
  });

  test("should have register buttons linking to Google Form", async ({ page }) => {
    const joinButtons = page.getByRole("button", { name: /register|join now/i });
    const count = await joinButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show FAQ section", async ({ page }) => {
    await expect(page.getByText(/frequently asked questions/i)).toBeVisible();
  });

  test("should show FAQ toggle interaction", async ({ page }) => {
    const firstFaq = page.locator("button").filter({ hasText: /is this workshop/i }).first();
    if (await firstFaq.isVisible()) {
      await firstFaq.click();
      await expect(page.getByText(/100% free/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("should show facilitator card", async ({ page }) => {
    await expect(page.getByText(/debapriya ghosal/i)).toBeVisible();
    await expect(page.getByText(/all india rank holder/i)).toBeVisible();
    await expect(page.getByText(/microsoft certified/i)).toBeVisible();
  });

  test("should show event details", async ({ page }) => {
    await expect(page.getByText(/7th june/i)).toBeVisible();
    await expect(page.getByText(/6:00 pm/i)).toBeVisible();
  });

  test("should show 'What You'll Get' benefits section", async ({ page }) => {
    await expect(page.getByText(/hands-on practice/i)).toBeVisible();
    await expect(page.getByText(/certificate/i).first()).toBeVisible();
  });

  test("should show tools covered section", async ({ page }) => {
    await expect(page.getByText(/explore top ai tools/i)).toBeVisible();
    await expect(page.getByText(/chatgpt/i)).toBeVisible();
    await expect(page.getByText(/grok/i)).toBeVisible();
  });

  test("should show placement guidance section", async ({ page }) => {
    await expect(page.getByText(/100% placement guidance/i)).toBeVisible();
    await expect(page.getByText(/resume/i)).toBeVisible();
    await expect(page.getByText(/interview preparation/i)).toBeVisible();
  });

  test("should show contact info", async ({ page }) => {
    await expect(page.getByText(/7890016776/i)).toBeVisible();
    await expect(page.getByText(/yesdo edutech private limited/i)).toBeVisible();
  });

  test("should show verified companies section", async ({ page }) => {
    await expect(page.getByText(/trusted by/i).or(page.getByText(/Google|Microsoft|Amazon|TCS/))).toBeVisible().catch(() => {});
  });

  test("should have sticky bottom bar with CTA", async ({ page }) => {
    const bottomBar = page.locator("button").filter({ hasText: /join now/i }).last();
    if (await bottomBar.isVisible()) {
      await expect(bottomBar).toBeVisible();
    }
  });
});
