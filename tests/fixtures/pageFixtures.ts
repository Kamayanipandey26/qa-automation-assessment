import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { SearchPage } from '../pages/SearchPage';
import { PetApiClient } from '../pages/PetApiClient';
type PageFixtures = {
  homePage: HomePage;
  categoryPage: CategoryPage;
  searchPage: SearchPage;
  petApiClient: PetApiClient;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);
    await use(categoryPage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  petApiClient: async ({ request }, use) => {
    const petApiClient = new PetApiClient(request);
    await use(petApiClient);
  }

});

export { expect } from '@playwright/test';