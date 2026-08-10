import { test, expect } from '../fixtures/pageFixtures';

test.describe('Home Page Verification', () => {
  test('key navigation elements are present on the home page', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.verifyNavigationVisible();

    await page.screenshot({
      path: 'verification/home_page.png',
      fullPage: true,
    });
  });
});