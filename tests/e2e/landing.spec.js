import { test, expect } from '@playwright/test';

test('serves a named XinovaSU main landmark', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('main[aria-label="XinovaSU 产品介绍"]')).toBeVisible();
  await expect(page).toHaveTitle(/XinovaSU/);
});
