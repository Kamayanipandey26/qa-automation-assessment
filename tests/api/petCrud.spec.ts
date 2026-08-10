import { test, expect } from '../fixtures/pageFixtures';
import { generatePetId, generatePetName } from '../data/testData';

test.describe('Pet API CRUD Operations', () => {
  test('full CRUD lifecycle for a pet resource', async ({ petApiClient }) => {
    const petId = generatePetId();
    const petName = generatePetName();

    // Create
    const createResponse = await petApiClient.createPet(petId, petName);
    expect(createResponse.ok()).toBeTruthy();
    const createdBody = await createResponse.json();
    expect(createdBody.id).toBe(petId);
    expect(createdBody.name).toBe(petName);

    // Read
    const getResponse = await petApiClient.getPet(petId);
    expect(getResponse.ok()).toBeTruthy();
    const fetchedBody = await getResponse.json();
    expect(fetchedBody.id).toBe(petId);
    expect(fetchedBody.name).toBe(petName);

    // Update
    const updatedName = `${petName}_Updated`;
    const updateResponse = await petApiClient.updatePetName(petId, updatedName);
    expect(updateResponse.ok()).toBeTruthy();
    const updatedBody = await updateResponse.json();
    expect(updatedBody.name).toBe(updatedName);

    // Delete
    const deleteResponse = await petApiClient.deletePet(petId);
    expect(deleteResponse.ok()).toBeTruthy();

    // Confirm gone
    const confirmResponse = await petApiClient.getPet(petId);
    expect(confirmResponse.status()).toBe(404);
  });
});