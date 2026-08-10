import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly resultsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsHeading = page.getByText(/your search results for/i);
  }

  async verifyResultsFor(searchTerm: string) {
    await expect(this.page).toHaveURL(new RegExp(`q=${searchTerm}`, 'i'));
    await expect(
      this.page.getByText(new RegExp(`your search results for.*${searchTerm}`, 'i'))
    ).toBeVisible();
  }
}