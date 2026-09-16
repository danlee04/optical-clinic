import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the services page lists every service and links to its detail page', async ({ page }) => {
  await page.goto('/services');
  await expect(page.getByRole('heading', { level: 1, name: 'Services' })).toBeVisible();

  const links = page.getByRole('link', { name: 'Comprehensive Eye Exam' });
  await expect(links.first()).toHaveAttribute('href', '/services/comprehensive-eye-exam');

  await links.first().click();
  await expect(page).toHaveURL(/\/services\/comprehensive-eye-exam$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Comprehensive Eye Exam' }),
  ).toBeVisible();
});

test('a service detail page shows duration, price, branches and related services', async ({
  page,
}) => {
  await page.goto('/services/comprehensive-eye-exam');
  await expect(page.getByText('45 minutes')).toBeVisible();
  await expect(page.getByText('Starts at ₱800')).toBeVisible();

  const available = page.getByRole('region', { name: 'Available at' });
  await available.scrollIntoViewIfNeeded();
  await expect(available.getByText('Clearview Makati')).toBeVisible();

  const related = page.getByRole('region', { name: 'Other services' });
  await related.scrollIntoViewIfNeeded();
  const relatedLinks = related.getByRole('link');
  await expect(relatedLinks).toHaveCount(3);
  const hrefs = await relatedLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  );
  expect(hrefs.every((href) => href?.startsWith('/services/'))).toBe(true);
  expect(hrefs).not.toContain('/services/comprehensive-eye-exam');
});

test('the free service hides the price row', async ({ page }) => {
  await page.goto('/services/eyewear-adjustment-and-repair');
  await expect(page.getByText(/starts at/i)).toHaveCount(0);
});

test('an unknown service slug returns the 404 page', async ({ page }) => {
  const response = await page.goto('/services/laser-surgery');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
});

test('the service card link shows a visible focus ring', async ({ page }) => {
  await page.goto('/services');
  const link = page.getByRole('link', { name: 'Comprehensive Eye Exam' }).first();
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).not.toHaveCSS('outline-style', 'none');
  await expect(link).toHaveCSS('outline-width', '2px');
});

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('a service detail page passes axe', async ({ page }) => {
    await page.goto('/services/contact-lens-fitting');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(blocking.map((violation) => violation.id)).toEqual([]);
  });
});
