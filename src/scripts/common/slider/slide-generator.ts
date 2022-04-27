import Swiper from 'swiper';
import petsData from '../../../assets/data/pets.json';
import { PetCard } from '../types/petCard';
import { cssSelectors } from './cssSelectors';

const getSlideMarkup = (pets: PetCard[], baseContentImagesUrl: string, correlationId: number) => {
  const petCardsMarkup = getPetCardsMarkup(pets, baseContentImagesUrl);

  return `<div class="pet-list swiper-slide" data-correlation-id="${correlationId}">${petCardsMarkup}</div>`;
};

const getPetCardsMarkup = (pets: PetCard[], baseContentImagesUrl: string) => {
  return pets.reduce((markup, pet) => markup + getPetCardMarkup(pet, baseContentImagesUrl), '');
};

const getPetCardMarkup = (pet: PetCard, baseContentImagesUrl: string) => {
  const petCardClass = cssSelectors.petCard.slice(1);

  return `<article class="pet-list__item" title="${pet.name}">
    <div class="${petCardClass}" data-correlation-id="${pet.id}">
      <div class="${petCardClass}__photo">
        <img src="${baseContentImagesUrl}/${pet.img}" alt="${pet.name}" />
      </div>
      <h6 class="${petCardClass}__name">${pet.name}</h6>
      <button class="button ${petCardClass}__button">Learn more</button>
    </div>
  </article>`;
};

const generateFullPetCardsSetIds = (slidesNumber: number, petCardsNumber: number) => {
  const totalPetCardsNumber = slidesNumber * petCardsNumber;
  const initialPetCardsNumber = petsData.length;
  const petCardsIds = petsData.map((x) => x.id);
  const result: number[] = [];

  for (let i = 0; i < totalPetCardsNumber; i = i + initialPetCardsNumber) {
    const idsToSliceNumber = totalPetCardsNumber - i > initialPetCardsNumber ? initialPetCardsNumber : totalPetCardsNumber - i;

    result.push(...petCardsIds.slice(0, idsToSliceNumber));
  }

  return result;
};

const generateSlide = (petCardIds: number[], baseContentImagesUrl: string, correlationId: number) => {
  const petCards = petsData.filter((x) => petCardIds.includes(x.id)).sort((a, b) => petCardIds.indexOf(a.id) - petCardIds.indexOf(b.id));

  return getSlideMarkup(petCards, baseContentImagesUrl, correlationId);
};

const generateInitialSlides = (swiper: Swiper, baseContentImagesUrl: string, slidesNumber: number, petCardsNumber: number, loop: boolean) => {
  const fullPetCardsSetIds = generateFullPetCardsSetIds(slidesNumber, petCardsNumber);

  for (let i = 0, startSliceIndex = 0; i < slidesNumber; i++, startSliceIndex = startSliceIndex + petCardsNumber) {
    const petCardIds = fullPetCardsSetIds.slice(startSliceIndex, startSliceIndex + petCardsNumber);
    const randomPetCardIds = petCardIds.sort(() => Math.random() - 0.5);

    swiper.appendSlide(generateSlide(randomPetCardIds, baseContentImagesUrl, i + 1));
  }

  if (loop) {
    randomizeSideSlides(swiper, baseContentImagesUrl);
  }
};

const randomizeSideSlides = (swiper: Swiper, baseContentImagesUrl: string) => {
  const currentSlide = swiper.slides[swiper.activeIndex] as HTMLElement;
  const correlationId = currentSlide.dataset.correlationId;
  const slideId = correlationId ? +correlationId : 0;
  const otherSlideIds = [...Array(3).keys()].map((x) => ++x).filter((x) => x !== slideId);
  const petCardsIdsFromSlide = Array.from(currentSlide.querySelectorAll(cssSelectors.petCard)).map((x) => {
    const slide = x as HTMLElement;
    const correlationId = slide.dataset.correlationId;

    return correlationId ? +correlationId : 0;
  });
  const freePetCardsIds = petsData.map((x) => x.id).filter((x) => !petCardsIdsFromSlide.includes(x));

  otherSlideIds
    .map((id) => swiper.slides.filter((slide) => +slide.dataset.correlationId === id))
    .forEach((slides) => {
      const randomIds = freePetCardsIds.sort(() => Math.random() - 0.5).slice(0, petCardsIdsFromSlide.length);
      const petCards = petsData.filter((x) => randomIds.includes(x.id));

      slides.forEach((slide) => {
        slide.innerHTML = getPetCardsMarkup(petCards, baseContentImagesUrl);
      });
    });
};

export const slideGenerator = {
  generateInitialSlides,
  randomizeSideSlides
};
