import { Page, expect, test } from '@playwright/test';
import { testNoJs, waitForHydration } from './helper';

test('layouts @js', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);
  await testLayouts(page, { js: true });
});

testNoJs('layouts @nojs', async ({ page }) => {
  await page.goto('/');
  await testLayouts(page, { js: false });
});

async function testLayouts(page: Page, options: { js: boolean }) {
  await page
    .getByRole('link', { name: 'Nested Layouts Create UI that' })
    .click();
  await page.waitForURL('/layouts');

  await page.getByRole('link', { name: 'Electronics' }).click();
  await page.getByRole('heading', { name: 'All Electronics' }).click();
  await page.waitForURL('/layouts/electronics');

  await page.getByRole('link', { name: 'Phones' }).click();
  await page.getByRole('heading', { name: 'Phones' }).click();
  await page.waitForURL('/layouts/electronics/phones');
}
