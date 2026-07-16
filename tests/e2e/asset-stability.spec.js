import { test, expect } from '@playwright/test';

const productionBuild = process.env.PLAYWRIGHT_PRODUCTION === '1';

test('uses stable CSS and JavaScript URLs in production', async ({ page }) => {
  test.skip(!productionBuild, 'Production build only');

  await page.goto('/xinovasu-landing/');
  const assets = await page.locator('link[rel="stylesheet"], script[type="module"]').evaluateAll((elements) =>
    elements.map((element) => new URL(element.href || element.src).pathname)
  );

  expect(assets).toContain('/xinovasu-landing/assets/main.css');
  expect(assets).toContain('/xinovasu-landing/assets/main.js');
});

test('keeps recent hashed asset URLs available for cached pages', async ({ request }) => {
  test.skip(!productionBuild, 'Production build only');

  const legacyPaths = [
    '/xinovasu-landing/assets/main-qYszI15w.css',
    '/xinovasu-landing/assets/components-C8RShRcg.css',
    '/xinovasu-landing/assets/main-5Br8a2Yu.css',
    '/xinovasu-landing/assets/docs-C8oNrDw9.css',
    '/xinovasu-landing/assets/main-DLfnNQTM.js',
    '/xinovasu-landing/assets/main-vPVjDg3z.js'
  ];

  for (const path of legacyPaths) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should remain available`).toBe(true);
    expect(response.headers()['content-type'], `${path} should not fall back to HTML`)
      .not.toContain('text/html');
  }
});
