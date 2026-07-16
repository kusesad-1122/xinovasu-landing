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
  await expect(page.getByRole('link', { name: '使用文档 →' }))
    .toHaveAttribute('href', './docs.html');
});

test('has distinct desktop and mobile compositions without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toBeVisible();
  await expect(page.locator('.phone-stage')).toBeVisible();
  await expect(page.locator('.capability')).toHaveCount(4);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#mobile-menu-button')).toBeVisible();
  await page.locator('#mobile-menu-button').click();
  await expect(page.locator('#mobile-menu-button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator('.feature-row').first().locator('div').evaluate((element) => element.getBoundingClientRect().width)).resolves.toBeGreaterThanOrEqual(220);
});

test('renders the local layered device visual without a decorative central node', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.phone-stage .reference-device')).toBeVisible();
  await expect(page.locator('.kernel-node')).toHaveCount(0);
  await expect(page.locator('.ground-grid')).toHaveCount(1);
  await expect(page.locator('.brand img')).toHaveAttribute('src', /xos-mark\.svg$/);
  await expect(page.locator('.brand img')).toHaveAttribute('alt', 'XOS');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.reference-device')).toHaveCSS('animation-name', 'none');
});

test('provides a dedicated XinovaSU usage guide with official source links', async ({ page }) => {
  await page.goto('/xinovasu-landing/docs.html');

  await expect(page).toHaveTitle(/XinovaSU 使用文档/);
  await expect(page.getByRole('heading', { name: '安装前，请先确认这四件事' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'KernelSU 官方安装指南' }))
    .toHaveAttribute('href', 'https://kernelsu.org/guide/installation.html');
});

test('activates a single feature row', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-feature="network"]').click();
  await expect(page.locator('[data-feature="network"]')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-feature="kernel-mask"]')).toHaveAttribute('aria-expanded', 'false');
});
