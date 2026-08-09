import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  await this.page.getByTestId('search-input').fill(searchTerm);
  await this.page.getByTestId('search-input').press('Enter');
});

Then('the results page should display products matching {string}', async function (this: CustomWorld, searchTerm: string) {
  await expect(this.page).toHaveURL(new RegExp(`q=${searchTerm}`, 'i'));
  await expect(
    this.page.getByText(new RegExp(`your search results for.*${searchTerm}`, 'i'))
  ).toBeVisible();
});