import { expect, test } from '@playwright/test';

test('the branch filter narrows the list and can be reset', async ({ page }) => {
  await page.goto('/optometrists');
  await expect(page.getByRole('heading', { level: 1, name: 'Optometrists' })).toBeVisible();
  // Scoped to <main>: the header and footer navigation also render <li> elements, which the
  // unscoped role query would otherwise count alongside the optometrist cards.
  const main = page.getByRole('main');
  await expect(main.getByRole('listitem')).toHaveCount(6);
  await expect(page.getByRole('status')).toHaveText('Showing 6 optometrists');

  await page.getByRole('button', { name: 'Clearview Pasig' }).click();
  await expect(main.getByRole('listitem')).toHaveCount(3);
  await expect(page.getByRole('status')).toHaveText('Showing 3 optometrists at Clearview Pasig');
  await expect(page.getByRole('button', { name: 'Clearview Pasig' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await page.getByRole('button', { name: 'All branches' }).click();
  await expect(main.getByRole('listitem')).toHaveCount(6);
});

test('the filter is keyboard operable', async ({ page }) => {
  await page.goto('/optometrists');
  const pasig = page.getByRole('button', { name: 'Clearview Pasig' });
  await pasig.focus();
  await expect(pasig).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(3);
});

test('the branch filter buttons show a visible focus ring', async ({ page }) => {
  await page.goto('/optometrists');
  const button = page.getByRole('button', { name: 'Clearview Makati' });
  await button.focus();
  await expect(button).not.toHaveCSS('outline-style', 'none');
  await expect(button).toHaveCSS('outline-width', '2px');
});

test('every optometrist is listed before filtering, with JavaScript disabled too', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/optometrists');
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(6);
  await context.close();
});
