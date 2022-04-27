import petsData from '../../../assets/data/pets.json';
import { PetCard } from '../types/petCard';
import { cssSelectors } from './cssSelectors';

const getPopupMarkup = (pet: PetCard, baseContentImagesUrl: string) => {
  return `<div class="${cssSelectors.popup.slice(1)}">
      <div class="pet-card">
        <div class="pet-card__photo">
          <img src="${baseContentImagesUrl}/${pet.img}" alt="${pet.name}" />
        </div>
        <div class="pet-card__info">
          <h3 class="title">${pet.name}</h3>
          <div class="subtitle">${pet.type} - ${pet.breed}</div>
          <div class="description">${pet.description}</div>
          <ul class="list">
            <li class="list__item">
              <b>Age</b>: ${pet.age}
            </li>
            <li class="list__item">
              <b>Inoculations</b>: ${pet.inoculations.join(', ')}
            </li>
            <li class="list__item">
              <b>Diseases</b>: ${pet.diseases.join(', ')}
            </li>
            <li class="list__item">
              <b>Parasites</b>: ${pet.parasites.join(', ')}
            </li>
          </ul>
        </div>
      </div>
      <button class="button close-button"></button>
    <div>`;
};

const open = (petCardId: number, baseContentImagesUrl: string) => {
  const petCard = petsData.find((x) => x.id === petCardId) as PetCard;
  const popup = document.createElement('div');

  popup.className = cssSelectors.popupContainer.slice(1);
  popup.innerHTML = getPopupMarkup(petCard, baseContentImagesUrl);

  document.body.classList.add(cssSelectors.hideScrollbarY.slice(1));
  document.body.appendChild(popup);

  const closeButton = popup.querySelector(cssSelectors.closeButton);

  closeButton?.addEventListener('click', (e) => close(e));

  const popupContainer = document.body.querySelector(cssSelectors.popupContainer);

  popupContainer?.addEventListener('click', (e) => close(e));
};

const close = (e: Event) => {
  const target = e.target as Element;
  const isCloseButton = target.matches(cssSelectors.closeButton);
  const isWithinPopup = target.closest(cssSelectors.popup) as HTMLElement;

  if (!isCloseButton && isWithinPopup) {
    return;
  }

  const popupContainer = document.querySelector(cssSelectors.popupContainer);

  if (popupContainer) {
    document.body.classList.remove(cssSelectors.hideScrollbarY.slice(1));
    document.body.removeChild(popupContainer);
  }
};

export const popup = {
  open
};
