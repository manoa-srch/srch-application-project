import { test, expect, type Page } from '@playwright/test';

const TEST_EMAIL = 'john@foo.com';
const TEST_PASSWORD = 'changeme123';

async function login(page: Page) {
  await page.goto('/auth/signin');

  await page.locator('input[type="email"]').fill(TEST_EMAIL);
  await page.locator('input[type="password"]').fill(TEST_PASSWORD);

  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).not.toHaveURL('/auth/signin');
}

test('landing page is available', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
});

test('sign in page is available', async ({ page }) => {
  await page.goto('/auth/signin');
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
});

test('can sign in with seeded account', async ({ page }) => {
  await login(page);
});

test('profile page is available after login', async ({ page }) => {
  await login(page);
  await page.goto('/profile');
  await expect(page.getByRole('heading', { name: /profile/i })).toBeVisible();
});

test('courses page is available after login', async ({ page }) => {
  await login(page);
  await page.goto('/courses');
  await expect(page.getByRole('heading', { name: /my courses/i })).toBeVisible();
});

test('new course page is available after login', async ({ page }) => {
  await login(page);
  await page.goto('/courses/new');
  await expect(page.getByRole('heading', { name: /create|new course/i })).toBeVisible();
});

test('SRCH library page is available after login', async ({ page }) => {
  await login(page);
  await page.goto('/srch');
  await expect(page.getByRole('heading', { name: /srch library/i })).toBeVisible();
});

test('curriculum page is available after login', async ({ page }) => {
  await login(page);
  await page.goto('/curriculum');

  // FIXED: make locator specific to the main page heading (h1)
  await expect(
    page.getByRole('heading', { level: 1, name: /curriculum gallery/i })
  ).toBeVisible();
});