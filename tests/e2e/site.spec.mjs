import { expect, test } from '@playwright/test';

test('homepage provides a usable product and learning entry', async ({ page }) => {
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('pageerror', (error) => browserErrors.push(error.message));

  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: 'Turnkey' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start learning' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Run. Build. Debug. Audit.' })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  expect(browserErrors).toEqual([]);
});

test('course navigation, search, and notebook download are reachable', async ({ page }) => {
  await page.goto('learn/quickstart/');
  await expect(page.getByRole('heading', { level: 1, name: /First auditable run/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download the Chapter 1 notebook/ })).toHaveAttribute('href', /00_quickstart\.ipynb$/);
  await expect(page.getByRole('button', { name: /search/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Build your own detector/ }).last()).toBeVisible();
});

test('all local homepage links resolve', async ({ page, request }) => {
  await page.goto('./');
  const hrefs = await page.locator('a[href]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.href))].filter((href) => href.startsWith(location.origin)),
  );

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
  }
});

test('keyboard focus and dark theme remain visible and stable', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();

  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
  });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const background = await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(background).not.toBe('rgba(0, 0, 0, 0)');
});
