export const testData = {
  navigation: {
    women: 'WOMEN',
    men: 'MEN',
  },
  search: {
    term: 'dress',
  },
  pet: {
    photoUrl: 'https://example.com/photo.jpg',
    status: 'available',
  },
};

export function generatePetId(): number {
  return Date.now();
}

export function generatePetName(): string {
  return `TestPet_${Math.random().toString(36).slice(2, 8)}`;
}