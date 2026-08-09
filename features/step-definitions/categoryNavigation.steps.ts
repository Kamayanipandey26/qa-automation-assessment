import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I click on the {string} navigation link', async function (this: CustomWorld, linkName: string) {
  if (linkName === 'WOMEN') {
    await this.page.getByTestId('women-floor').click();

  } else if (linkName === 'MEN') {
    await this.page.getByTestId('men-floor').click();
  } else {
    throw new Error(`No navigation mapping defined for "${linkName}"`);
  }
 
});

Then('I should land on the women\'s category page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL('https://www.asos.com/women/');
  await expect(this.page).toHaveTitle(/Women's Clothes/i);
});
Then('I should land on the men\'s category page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL('https://www.asos.com/men/');
  await expect(this.page).toHaveTitle(/Men's Clothes/i);
});