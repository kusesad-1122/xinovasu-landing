import { test, expect } from '@playwright/test';

test('serves a named XinovaSU main landmark', async ({ page }) => {
  await page.goto('/xinovasu-landing/');

  await expect(page.locator('main[aria-label="XinovaSU 产品介绍"]')).toBeVisible();
  await expect(page).toHaveTitle(/XinovaSU/);
});

test('contains all five approved features and public CTAs', async ({ page }) => {
  await page.goto('/xinovasu-landing/');

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
  await page.goto('/xinovasu-landing/');
  await expect(page.locator('.monograph-copy')).toBeVisible();
  await expect(page.locator('.monograph-device')).toBeVisible();
  await expect(page.locator('.capability')).toHaveCount(4);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#mobile-menu-button')).toBeVisible();
  await page.locator('#mobile-menu-button').click();
  await expect(page.locator('#mobile-menu-button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator('.feature-row').first().locator('div').evaluate((element) => element.getBoundingClientRect().width)).resolves.toBeGreaterThanOrEqual(220);
  const technologyItem = page.locator('.technology li').first();
  const technologyLayout = await technologyItem.evaluate((item) => {
    const index = item.querySelector('.technology-index').getBoundingClientRect();
    const title = item.querySelector('b').getBoundingClientRect();
    const description = item.querySelector('span:not(.technology-index)').getBoundingClientRect();
    return {
      indexRight: index.right,
      titleLeft: title.left,
      descriptionLeft: description.left,
      descriptionWidth: description.width
    };
  });
  expect(technologyLayout.indexRight).toBeLessThanOrEqual(technologyLayout.titleLeft);
  expect(technologyLayout.descriptionLeft).toBeGreaterThanOrEqual(technologyLayout.titleLeft - 1);
  expect(technologyLayout.descriptionWidth).toBeGreaterThanOrEqual(220);
});

test('renders the selected monograph hero at desktop and mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/xinovasu-landing/');
  await expect(page.locator('.monograph-hero')).toBeVisible();
  await expect(page.locator('.monograph-device .reference-device')).toBeVisible();
  await expect(page.locator('.monograph-notes article')).toHaveCount(4);
  await expect(page.locator('.monograph-device .ground-grid')).toHaveCount(1);
  await expect(page.locator('.monograph-device')).toHaveCSS('background-image', 'none');
  await expect(page.locator('a.button-dark').first()).toHaveAttribute('href', 'https://github.com/kusesad-1122/XinovaSU/releases/latest');

  await page.setViewportSize({ width: 390, height: 844 });
  const notes = page.locator('.monograph-notes article');
  await expect(notes).toHaveCount(4);
  const firstNote = notes.first();
  const noteWidth = await firstNote.evaluate((element) => element.getBoundingClientRect().width);
  expect(noteWidth).toBeGreaterThanOrEqual(300);
  expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true);
});

test('renders the local layered device visual without a decorative central node', async ({ page }) => {
  await page.goto('/xinovasu-landing/');
  await expect(page.locator('.monograph-device .reference-device')).toBeVisible();
  await expect(page.locator('.kernel-node')).toHaveCount(0);
  await expect(page.locator('.ground-grid')).toHaveCount(1);
  await expect(page.locator('.monograph-device.product-stage')).toHaveCSS('background-image', 'none');
  await expect(page.locator('.brand img')).toHaveAttribute('src', /xos-mark\.svg$|aria-label='XOS'/);
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
  await page.goto('/xinovasu-landing/');
  await page.locator('[data-feature="network"]').click();
  await expect(page.locator('[data-feature="network"]')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-feature="kernel-mask"]')).toHaveAttribute('aria-expanded', 'false');
});

test('keeps monograph spacing after the production CSS build', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/xinovasu-landing/');

  const capabilityPadding = await page.locator('.capability').evaluateAll((items) =>
    items.map((item) => getComputedStyle(item).paddingLeft)
  );

  expect(capabilityPadding).toEqual(['0px', '0px', '0px', '0px']);
});

test('keeps the XinovaSU wordmark readable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/xinovasu-landing/');

  const titleSpacing = await page.locator('#hero-title').evaluate((title) =>
    Number.parseFloat(getComputedStyle(title).letterSpacing)
  );

  expect(titleSpacing).toBeGreaterThan(-4);
});

test('numbers every engineering highlight from 01 to 04', async ({ page }) => {
  await page.goto('/xinovasu-landing/');

  await expect(page.locator('.technology-index')).toHaveText(['01', '02', '03', '04']);
});

test('keeps anchored sections below the sticky header', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/xinovasu-landing/#features');
  await page.waitForTimeout(600);

  const positions = await page.evaluate(() => ({
    headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
    sectionTop: document.querySelector('#features').getBoundingClientRect().top
  }));

  expect(positions.sectionTop).toBeGreaterThanOrEqual(positions.headerBottom);
});
