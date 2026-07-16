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

test('has distinct desktop and mobile compositions without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toBeVisible();
  await expect(page.locator('.phone-stage')).toBeVisible();
  await expect(page.locator('.capability')).toHaveCount(4);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#mobile-menu-button')).toBeVisible();
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
});

test('renders independently addressable phone layers and disables automatic motion when requested', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.phone-stage .module-panel')).toHaveCount(3);
  await expect(page.locator('.kernel-node')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.phone-stage')).toHaveCSS('animation-name', 'none');
});
