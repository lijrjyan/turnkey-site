import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function generatedRoutes() {
  const sitemap = await readFile(new URL('../../dist/sitemap-0.xml', import.meta.url), 'utf8');
  return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
    const pathname = new URL(match[1]).pathname;
    return pathname.replace(/^\/turnkey-site\/?/, '');
  });
}

test('every generated page renders one primary heading without page overflow', async ({ page }) => {
  for (const route of await generatedRoutes()) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} did not load`).toBe(true);
    await expect(page.locator('h1')).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `${route} overflows horizontally`).toBe(false);
  }
});

test('every generated page has valid local links', async ({ page, request }) => {
  const checked = new Map();

  for (const route of await generatedRoutes()) {
    await page.goto(route);
    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.href))].filter((href) => href.startsWith(location.origin)),
    );

    for (const href of hrefs) {
      if (!checked.has(href)) checked.set(href, await request.get(href));
      const response = checked.get(href);
      expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
    }
  }
});

for (const route of ['', 'learn/quickstart/', 'reference/artifact-schema/']) {
  test(`${route || 'home'} has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    // Expressive Code marks overflowing code blocks focusable from a debounced
    // idle callback; let that settle before scanning or the scan races it.
    await page.waitForFunction(() => {
      const scrollable = [...document.querySelectorAll('.expressive-code pre')].filter(
        (pre) => pre.scrollWidth > pre.clientWidth,
      );
      return scrollable.every((pre) => pre.getAttribute('tabindex') === '0');
    });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
