// Este arquivo centraliza as chamadas HTTP para o backend.
const API_URL = 'http://localhost:3333'; // Altere para a URL da API do grupo

// Modo de simulação automático caso o backend não esteja rodando
let useMock = false; 

let mockPets = [
  {
    id: 1,
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Labrador',
    age: '3 anos',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150'
  },
  {
    id: 2,
    name: 'Mimi',
    species: 'Gato',
    breed: 'Siamês',
    age: '2 anos',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150'
  }
];

export async function getPets(token) {
  if (useMock) return [...mockPets];
  try {
    const response = await fetch(`${API_URL}/pets`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error();
    return response.json();
  } catch (err) {
    console.warn('API offline. Usando dados simulados para pets.');
    useMock = true;
    return [...mockPets];
  }
}

export async function createPet(petData, token) {
  if (useMock) {
    const newPet = { ...petData, id: Date.now(), photo: petData.photo || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150' };
    mockPets.push(newPet);
    return newPet;
  }
  try {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    });
    if (!response.ok) throw new Error();
    return response.json();
  } catch (err) {
    useMock = true;
    return createPet(petData, token);
  }
}

export async function updatePet(id, petData, token) {
  if (useMock) {
    mockPets = mockPets.map((pet) => (pet.id === Number(id) ? { ...pet, ...petData } : pet));
    return petData;
  }
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    });
    if (!response.ok) throw new Error();
    return response.json();
  } catch (err) {
    useMock = true;
    return updatePet(id, petData, token);
  }
}

export async function deletePet(id, token) {
  if (useMock) {
    mockPets = mockPets.filter((pet) => pet.id !== Number(id));
    return true;
  }
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error();
    return true;
  } catch (err) {
    useMock = true;
    return deletePet(id, token);
  }
}