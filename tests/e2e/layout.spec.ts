import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { waitForEntranceAnimations } from './helpers';

const ROUTES = [
  '/',
  '/services',
  '/services/comprehensive-eye-exam',
  '/services/eyewear-adjustment-and-repair',
  '/branches',
  '/optometrists',
  '/about',
  '/faq',
  '/contact',
  '/privacy',
];
const WIDTHS = [320, 375, 768, 1024, 1280, 1920];

for (const route of ROUTES) {
  test(`${route} loads with one h1, no console errors and no serious axe violations`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await waitForEntranceAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(blocking.map((violation) => violation.id)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('unknown routes show the branded 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('main#main')).toBeFocused();
});

test('desktop navigation reaches the Branches page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop navigation is hidden on mobile');
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Branches' })
    .click();
  await expect(page).toHaveURL(/\/branches$/);
  await expect(
    page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Branches' }),
  ).toHaveAttribute('aria-current', 'page');
});

test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile menu only renders on small screens');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Optometrists' }).click();
  await expect(page).toHaveURL(/\/optometrists$/);
  await expect(dialog).toBeHidden();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('no route scrolls horizontally at the supported widths', async ({ page, isMobile }) => {
  test.skip(isMobile, 'widths are set explicitly; run once on desktop Chromium');
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ROUTES) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('home page passes axe with every section fully opaque', async ({ page }) => {
    await page.goto('/');

    // Under reduced motion the .reveal scroll animation does not apply, so axe sees the real
    // colours of the whole page instead of skipping transparent sections as "incomplete".
    const opacities = await page.$$eval('.reveal', (elements) =>
      elements.map((element) => getComputedStyle(element).opacity),
    );
    expect(opacities.length).toBeGreaterThan(0);
    expect(opacities.every((opacity) => opacity === '1')).toBe(true);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(blocking.map((violation) => violation.id)).toEqual([]);
  });
});
