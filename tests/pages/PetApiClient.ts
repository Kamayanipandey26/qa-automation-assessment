import { APIRequestContext, expect } from '@playwright/test';
import { testData } from '../data/testData';

export class PetApiClient {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createPet(id: number, name: string) {
  return this.request.post('pet', {  // was '/pet'
    data: {
      id,
      name,
      photoUrls: [testData.pet.photoUrl],
      status: testData.pet.status,
    },
  });
}

async getPet(id: number) {
  return this.request.get(`pet/${id}`);  // was `/pet/${id}`
}

async updatePetName(id: number, newName: string) {
  return this.request.put('pet', {  // was '/pet'
    data: {
      id,
      name: newName,
      photoUrls: [testData.pet.photoUrl],
      status: testData.pet.status,
    },
  });
}

async deletePet(id: number) {
  return this.request.delete(`pet/${id}`);  // was `/pet/${id}`
}
}