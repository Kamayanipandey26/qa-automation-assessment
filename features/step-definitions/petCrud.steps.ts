import { Given, When, Then } from '@cucumber/cucumber';
import { expect, request } from '@playwright/test';
import { CustomWorld } from '../support/world';

const BASE_URL = 'https://petstore.swagger.io/v2';

Given('I generate a new pet with a unique id and name', async function (this: CustomWorld) {
  this.petId = Date.now(); // e.g. 1735891234567 - unlikely to collide with existing data
  this.petName = `TestPet_${Math.random().toString(36).slice(2, 8)}`;
});

When('I send a request to create the pet', async function (this: CustomWorld) {
  const apiContext = await request.newContext();
  this.apiResponse = await apiContext.post(`${BASE_URL}/pet`, {
    data: {
      id: this.petId,
      name: this.petName,
      photoUrls: ['https://example.com/photo.jpg'],
      status: 'available',
    },
  });
});

Then('the response should confirm the pet was created successfully', async function (this: CustomWorld) {
  expect(this.apiResponse.ok()).toBeTruthy();
  const body = await this.apiResponse.json();
  expect(body.id).toBe(this.petId);
  expect(body.name).toBe(this.petName);
});
When('I retrieve the pet by its id', async function (this: CustomWorld) {
  const apiContext = await request.newContext();
  this.apiResponse = await apiContext.get(`${BASE_URL}/pet/${this.petId}`);
});

Then('the response should contain the expected pet data', async function (this: CustomWorld) {
  expect(this.apiResponse.ok()).toBeTruthy();
  const body = await this.apiResponse.json();
  expect(body.id).toBe(this.petId);
  expect(body.name).toBe(this.petName);
});
When('I update the pet\'s name', async function (this: CustomWorld) {
  this.petName = `${this.petName}_Updated`;
  const apiContext = await request.newContext();
  this.apiResponse = await apiContext.put(`${BASE_URL}/pet`, {
    data: {
      id: this.petId,
      name: this.petName,
      photoUrls: ['https://example.com/photo.jpg'],
      status: 'available',
    },
  });
});

Then('the response should reflect the updated name', async function (this: CustomWorld) {
  expect(this.apiResponse.ok()).toBeTruthy();
  const body = await this.apiResponse.json();
  expect(body.name).toBe(this.petName);
});

When('I delete the pet', async function (this: CustomWorld) {
  const apiContext = await request.newContext();
  this.apiResponse = await apiContext.delete(`${BASE_URL}/pet/${this.petId}`);
});

Then('a subsequent request for the pet should return a not-found response', async function (this: CustomWorld) {
  expect(this.apiResponse.ok()).toBeTruthy(); // the DELETE call itself succeeded

  const apiContext = await request.newContext();
  const getResponse = await apiContext.get(`${BASE_URL}/pet/${this.petId}`);
  expect(getResponse.status()).toBe(404);
});