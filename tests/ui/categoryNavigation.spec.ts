import { test, expect } from '../fixtures/pageFixtures';

test.describe('Category Navigation', () => {
  test('navigating to the Women\'s category loads the correct landing page', async ({ homePage, categoryPage, page }) => {
    await homePage.goto();
    await homePage.clickWomen();
    await categoryPage.verifyWomenLandingPage();

    await page.screenshot({
      path: 'verification/category_navigation_women.png',
      fullPage: true,
    });
  });

  test('navigating to the Men\'s category loads the correct landing page', async ({ homePage, categoryPage, page }) => {
    await homePage.goto();
    await homePage.clickMen();
    await categoryPage.verifyMenLandingPage();

    await page.screenshot({
      path: 'verification/category_navigation_men.png',
      fullPage: true,
    });
  });
});