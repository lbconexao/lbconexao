import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  timeout: process.env.CI ? 60000 : 30000, forbidOnly: !!process.env.CI,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4173/lbconexao/', trace: 'retain-on-failure', launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined } },
  webServer: { command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173/lbconexao/', reuseExistingServer: !process.env.CI },
});
