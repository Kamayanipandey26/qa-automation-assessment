import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly womenNavLink: Locator;
  readonly menNavLink: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'ASOS home' });
    this.womenNavLink = page.getByTestId('women-floor');
    this.menNavLink = page.getByTestId('men-floor');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInput = page.getByTestId('search-input');
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyNavigationVisible() {
    await expect(this.logo).toBeVisible();
    await expect(this.womenNavLink).toBeVisible();
    await expect(this.menNavLink).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async clickWomen() {
    await this.womenNavLink.click();
  }

  async clickMen() {
    await this.menNavLink.click();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}