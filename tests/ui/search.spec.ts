import { test, expect } from '../fixtures/pageFixtures';
import { testData } from '../data/testData';

test.describe('Search Functionality', () => {
  test('searching for a product returns matching results', async ({ homePage, searchPage, page }) => {
    await homePage.goto();
    await homePage.searchFor(testData.search.term);
    await searchPage.verifyResultsFor(testData.search.term);

    await page.screenshot({
      path: 'verification/search_results.png',
      fullPage: true,
    });
  });
});