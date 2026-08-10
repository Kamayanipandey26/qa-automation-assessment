import { Page, expect } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyWomenLandingPage() {
    await expect(this.page).toHaveURL('https://www.asos.com/women/');
    await expect(this.page).toHaveTitle(/Women's Clothes/i);
  }

  async verifyMenLandingPage() {
    await expect(this.page).toHaveURL('https://www.asos.com/men/');
    await expect(this.page).toHaveTitle(/Men's Clothes/i);
  }
}