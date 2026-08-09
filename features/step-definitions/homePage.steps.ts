import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I navigate to the home page', async function (this: CustomWorld) {
  await this.page.goto('https://www.asos.com/');
});

Then('I should see the site logo', async function (this: CustomWorld) {
  await expect(this.page.getByRole('link', { name: 'ASOS home' })).toBeVisible();
});

Then('I should see the main navigation links', async function (this: CustomWorld) {
  await expect(this.page.getByTestId('women-floor')).toBeVisible();
  await expect(this.page.getByTestId('men-floor')).toBeVisible();
});

Then('I should see the search icon', async function (this: CustomWorld) {
  await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();
});

Then('I capture a full-page screenshot named {string}', async function (this: CustomWorld, screenshotName: string) {
  await this.page.screenshot({
    path: `verification/${screenshotName}.png`,
    fullPage: true,
  });
});