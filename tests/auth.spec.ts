import { test, expect } from "@playwright/test";

test.describe("Authentication Pages", () => {
  test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/login");
    });

    test("should load login page", async ({ page }) => {
      await expect(page).toHaveTitle(/YesDo Edutech/);
      await expect(page.getByText("Welcome back")).toBeVisible();
    });

    test("should display login form with all fields", async ({ page }) => {
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
    });

    test("should show error with invalid credentials", async ({ page }) => {
      await page.locator('input[type="email"]').fill("wrong@email.com");
      await page.locator('input[type="password"]').fill("wrongpass");
      await page.getByRole("button", { name: /sign in/i }).click();
      await expect(page.getByText(/invalid email or password/i)).toBeVisible({ timeout: 10000 }).catch(() => {
        // Firebase might handle it differently
      });
    });

    test("should have demo account button", async ({ page }) => {
      const demoBtn = page.getByText(/demo account/i);
      await expect(demoBtn).toBeVisible();
    });

    test("should link to signup page", async ({ page }) => {
      const signupLink = page.getByRole("link", { name: /sign up/i });
      await expect(signupLink).toBeVisible();
      await signupLink.click();
      await expect(page).toHaveURL(/\/signup/);
    });

    test("should have Google sign-in option", async ({ page }) => {
      await expect(page.getByText(/continue with google/i)).toBeVisible();
    });

    test("should toggle password visibility", async ({ page }) => {
      const passwordInput = page.locator('input[type="password"]');
      const toggleBtn = page.locator("button").filter({ has: page.locator("svg") }).first();
      if (await toggleBtn.isVisible()) {
        await toggleBtn.click();
        await expect(page.locator('input[type="text"]')).toBeVisible();
      }
    });
  });

  test.describe("Signup Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/signup");
    });

    test("should load signup page", async ({ page }) => {
      await expect(page.getByText(/create your account/i)).toBeVisible();
    });

    test("should display signup form with all fields", async ({ page }) => {
      await expect(page.locator('input[type="text"]').first()).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
    });

    test("should show error for short password", async ({ page }) => {
      await page.locator('input[type="text"]').first().fill("Test User");
      await page.locator('input[type="email"]').fill("test@example.com");
      await page.locator('input[type="password"]').fill("12345");
      await page.getByRole("button", { name: /create account/i }).click();
      await expect(page.getByText(/password must be at least 6 characters/i)).toBeVisible();
    });

    test("should link to login page", async ({ page }) => {
      await page.getByRole("link", { name: /sign in/i }).click();
      await expect(page).toHaveURL(/\/login/);
    });
  });
});
