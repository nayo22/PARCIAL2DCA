// src/services/dogApiService.ts

const BASE_URL = 'https://dog.ceo/api';

/**
 * Devuelve una imagen aleatoria de cualquier raza de perro.
 */
export async function getRandomDogImage(): Promise<string> {
  const response = await fetch(`${BASE_URL}/breeds/image/random`);
  const data = await response.json();
  return data.message; // URL de imagen
}

/**
 * Devuelve una lista con todas las razas disponibles.
 */
export async function getAllBreeds(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);
  const data = await response.json();
  return Object.keys(data.message); // ['affenpinscher', 'african', ...]
}

/**
 * Devuelve una imagen aleatoria de una raza específica.
 * @param breed Nombre de la raza (en minúsculas, sin espacios)
 */
export async function getRandomImageByBreed(breed: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message; // URL de imagen
}
