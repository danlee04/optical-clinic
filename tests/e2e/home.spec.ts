import { expect, test } from '@playwright/test';

test('every Home section appears in order', async ({ page }) => {
  await page.goto('/');
  const headings = [
    'Services for every stage of life',
    'Eye care that feels personal',
    'Find a clinic near you',
    'Meet our optometrists',
    'What our patients say',
    'Before your visit',
    'Ready for clearer vision?',
  ];

  await expect(page.getByRole('heading', { level: 2 })).toHaveText(headings);

  for (const name of headings) {
    const heading = page.getByRole('heading', { level: 2, name });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    // toBeVisible() ignores opacity, so assert the reveal animation actually finished.
    await expect
      .poll(() =>
        heading.evaluate((element) => {
          const wrapper = element.closest('.reveal');
          return Number(getComputedStyle(wrapper ?? element).opacity);
        }),
      )
      .toBeGreaterThan(0.9);
  }
});

test('branch badges resolve to open or closed after hydration', async ({ page }) => {
  await page.goto('/');
  const badges = page.locator('[data-status]');
  await expect(badges).toHaveCount(3);
  for (const badge of await badges.all()) {
    await expect(badge).toHaveAttribute('data-status', /^(open|closed)$/);
  }
});

test('testimonials can be paused', async ({ page }) => {
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pause testimonials' });
  await pause.scrollIntoViewIfNeeded();
  await pause.click();
  await expect(page.getByRole('button', { name: 'Play testimonials' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const playState = await page
    .locator('[data-slot="marquee-track"]')
    .first()
    .evaluate((el) => getComputedStyle(el).animationPlayState);
  expect(playState).toBe('paused');
});

test('optometrist carousel moves to the next slide', async ({ page }) => {
  await page.goto('/');
  const next = page.getByRole('button', { name: 'Next slide' });
  await next.scrollIntoViewIfNeeded();
  await expect(next).toBeEnabled();
  await next.click();
  await expect(page.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
});

test('FAQ teaser opens an answer', async ({ page }) => {
  await page.goto('/');
  const question = page.getByRole('button', { name: 'Do you accept walk-in patients?' });
  await question.scrollIntoViewIfNeeded();
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Walk-ins are welcome at every branch')).toBeVisible();
});

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the marquee stops and shows a single static copy', async ({ page }) => {
    await page.goto('/');
    const tracks = page.locator('[data-slot="marquee-track"]');
    const first = tracks.first();
    await first.scrollIntoViewIfNeeded();
    expect(await first.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    await expect(tracks.nth(1)).toBeHidden();
    await expect(page.getByRole('button', { name: 'Pause testimonials' })).toBeHidden();
  });

  test('stats show their final values', async ({ page }) => {
    await page.goto('/');
    const stats = page.getByRole('region', { name: 'Clearview at a glance' });
    await stats.scrollIntoViewIfNeeded();
    const values = stats.locator('[data-slot="number-ticker-value"]');
    // Read once, with no auto-retry: under reduced motion the values must already be final,
    // not merely settle within Playwright's timeout.
    expect(await values.allTextContents()).toEqual(['3', '12+', '25,000+', '6']);
  });
});
