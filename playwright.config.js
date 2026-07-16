import { defineConfig } from '@playwright/test';

const isProductionBuild = process.env.PLAYWRIGHT_PRODUCTION === '1';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: isProductionBuild ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:5173',
    headless: true
  },
  webServer: {
    command: isProductionBuild
      ? 'npm.cmd run build && npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort'
      : 'npm.cmd run dev -- --host 127.0.0.1',
    url: isProductionBuild ? 'http://127.0.0.1:4173/xinovasu-landing/' : 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI
  }
});
