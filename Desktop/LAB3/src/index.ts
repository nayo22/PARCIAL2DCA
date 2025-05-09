import './components/dogCard';
import './components/dogPopup';
import { getAllBreeds, getRandomImageByBreed } from './services/dogApiService';

const container = document.getElementById('dog-container');

async function loadDogs() {
  try {
    const breeds = await getAllBreeds();
    const randomBreeds = breeds.sort(() => 0.5 - Math.random()).slice(0, 6);

    for (const breed of randomBreeds) {
      const img = await getRandomImageByBreed(breed);

      const card = document.createElement('dog-card');
      card.setAttribute('img', img);
      card.setAttribute('breed', breed);

      container?.appendChild(card);
    }
  } catch (error) {
    console.error('Error cargando perritos:', error);
  }
}

loadDogs();

document.addEventListener('dog-click', (e: any) => {
  const popup = document.createElement('dog-popup');
  popup.setAttribute('img', e.detail.img);
  popup.setAttribute('breed', e.detail.breed);
  document.body.appendChild(popup);
});
