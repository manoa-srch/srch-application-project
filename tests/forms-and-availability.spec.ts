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

async function createCourseAndOpen(page: Page) {
  const title = `Playwright Course ${Date.now()}`;

  await page.goto('/courses/new');

  await page.getByLabel('Course Title').fill(title);
  await page.getByLabel('Course Code').fill('ICS 314');
  await page.getByLabel('Course Description').fill('Created by Playwright.');

  await page.getByRole('button', { name: 'Create Course' }).click();

  await expect(page).toHaveURL(/\/courses\/\d+/);
  await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();

  return title;
}

test('landing page is available', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main').first()).toBeVisible();
});

test('sign in page is available', async ({ page }) => {
  await page.goto('/auth/signin');
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
});

test('can sign in with seeded account', async ({ page }) => {
  await login(page);
});

test('main protected pages are available after login', async ({ page }) => {
  await login(page);

  const protectedRoutes = [
    '/profile',
    '/courses',
    '/courses/new',
    '/srch',
    '/curriculum',
  ];

  for (const route of protectedRoutes) {
    await page.goto(route);

    await expect(page.locator('main').first()).toBeVisible();

    await expect(page).not.toHaveURL(/auth\/signin/);
  }
});

test('can create a course with legal inputs', async ({ page }) => {
  await login(page);

  const title = await createCourseAndOpen(page);

  await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  await expect(page.getByRole('main').getByText(/^ICS 314$/)).toBeVisible();
  await expect(page.getByText('Created by Playwright.')).toBeVisible();

  await expect(
    page.getByRole('heading', { level: 3, name: 'Learning Objectives' })
  ).toBeVisible();
});

test('course detail page has expected action buttons', async ({ page }) => {
  await login(page);

  await createCourseAndOpen(page);

  await expect(page.getByRole('button', { name: 'Edit Course' })).toBeVisible();
  await expect(page.getByRole('button', { name: /\+ Add Objective/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Browse SRCH/i })).toBeVisible();
});

test('can edit a course with legal inputs', async ({ page }) => {
  await login(page);

  await createCourseAndOpen(page);

  const updatedTitle = `Updated Playwright Course ${Date.now()}`;

  await page.getByRole('button', { name: 'Edit Course' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Edit Course' })).toBeVisible();

  await page.getByLabel('Course Title').fill(updatedTitle);
  await page.getByLabel('Course Code').fill('ICS 315');
  await page.getByLabel('Course Description').fill('Updated by Playwright.');

  await page.getByRole('button', { name: 'Save Changes' }).click();

  await expect(page.getByRole('heading', { level: 1, name: updatedTitle })).toBeVisible();
  await expect(page.getByRole('main').getByText(/^ICS 315$/)).toBeVisible();
  await expect(page.locator('main').first()).toContainText('Updated by Playwright.');
});

test('objective form page is available after creating a course', async ({ page }) => {
  await login(page);

  await createCourseAndOpen(page);

  await page.getByRole('button', { name: /\+ Add Objective/i }).click();

  await expect(
    page.getByRole('heading', { level: 1, name: 'Add Learning Objective' })
  ).toBeVisible();

  await expect(page.getByLabel('Objective Description')).toBeVisible();
  await expect(page.getByLabel("Bloom's Taxonomy Level")).toBeVisible();
  await expect(page.getByLabel('Position')).toBeVisible();
});

test('can create an objective with legal inputs', async ({ page }) => {
  await login(page);

  await createCourseAndOpen(page);

  const objective = `Students can explain SRCH mapping ${Date.now()}`;

  await page.getByRole('button', { name: /\+ Add Objective/i }).click();

  await page.getByLabel('Objective Description').fill(objective);
  await page.getByLabel("Bloom's Taxonomy Level").selectOption('UNDERSTAND');
  await page.getByLabel('Position').fill('1');

  await page.getByRole('button', { name: 'Create Objective' }).click();

  await expect(page.getByText(objective)).toBeVisible();
  await expect(page.getByText('UNDERSTAND')).toBeVisible();
});

test('can create an objective and start SRCH mapping flow', async ({ page }) => {
  await login(page);

  await createCourseAndOpen(page);

  const objective = `Map SRCH content objective ${Date.now()}`;

  await page.getByRole('button', { name: /\+ Add Objective/i }).click();

  await page.getByLabel('Objective Description').fill(objective);
  await page.getByLabel("Bloom's Taxonomy Level").selectOption('APPLY');
  await page.getByLabel('Position').fill('2');

  await page.getByRole('button', { name: 'Save & Map SRCH Content' }).click();

  await expect(page).toHaveURL(/\/srch/);
});