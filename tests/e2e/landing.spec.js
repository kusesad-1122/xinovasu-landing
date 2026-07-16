import { test, expect } from '@playwright/test';

test('serves a named XinovaSU main landmark', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('main[aria-label="XinovaSU 产品介绍"]')).toBeVisible();
  await expect(page).toHaveTitle(/XinovaSU/);
});

test('contains all five approved features and public CTAs', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hide 服务' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '网络隔离' })).toBeVisible();
  await expect(page.getByRole('link', { name: '下载最新版' }).first())
    .toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU/releases/latest');
  await expect(page.getByRole('link', { name: 'GitHub' }).first())
    .toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU');
});
