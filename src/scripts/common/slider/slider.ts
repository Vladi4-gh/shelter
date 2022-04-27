import Swiper, { Navigation, Manipulation } from 'swiper';
import { slideGenerator } from './slide-generator';
import { popup } from '../popup/popup';
import { cssSelectors } from './cssSelectors';
import { SlideSettings } from './types/slideOption';
import 'swiper/css';

const getSlideSettings = (sliderWidth: number, slides: SlideSettings[]) => {
  return (
    slides
      .filter((x) => x.maxWidth > sliderWidth)
      .sort((a, b) => a.maxWidth - b.maxWidth)
      .at(0) || { slidesNumber: 1, petCardsNumber: 1 }
  );
};

const getSliderWidth = (swiper: Swiper) => {
  const slider = swiper.el.closest(cssSelectors.slider) as HTMLElement;

  return slider.offsetWidth;
};

const initialize = (baseContentImagesUrl: string, slides: SlideSettings[], loop = false) => {
  const swiper = new Swiper(cssSelectors.swiper, {
    modules: [Navigation, Manipulation],
    spaceBetween: 90,
    loop,
    navigation: {
      prevEl: cssSelectors.buttonPrevious,
      nextEl: cssSelectors.buttonNext
    }
  });
  const { slidesNumber, petCardsNumber } = getSlideSettings(getSliderWidth(swiper), slides);

  swiper.on('slideChange', (e: Swiper) => {
    const paginationCount = e.$el.find(cssSelectors.paginationCount);

    paginationCount.text((e.realIndex + 1).toString());

    if (!loop) {
      const buttonFirst = e.$el.find(cssSelectors.buttonFirst);
      const buttonPrevious = e.$el.find(cssSelectors.buttonPrevious);
      const buttonNext = e.$el.find(cssSelectors.buttonNext);
      const buttonLast = e.$el.find(cssSelectors.buttonLast);

      [buttonFirst, buttonPrevious, buttonNext, buttonLast].forEach((x) => {
        x.removeClass(cssSelectors.buttonInactive.slice(1));
        x.removeAttr('disabled');
      });

      if (e.realIndex === 0) {
        [buttonFirst, buttonPrevious].forEach((x) => {
          x.addClass(cssSelectors.buttonInactive.slice(1));
          x.attr('disabled', '');
        });
      }

      if (e.realIndex === slidesNumber - 1) {
        [buttonNext, buttonLast].forEach((x) => {
          x.addClass(cssSelectors.buttonInactive.slice(1));
          x.attr('disabled', '');
        });
      }
    }
  });

  swiper.on('slideChangeTransitionEnd', (e: Swiper) => {
    if (loop) {
      slideGenerator.randomizeSideSlides(e, baseContentImagesUrl);
    }
  });

  swiper.$el.find(cssSelectors.buttonFirst).on('click', () => {
    swiper.slideTo(0);
  });

  swiper.$el.find(cssSelectors.buttonLast).on('click', () => {
    swiper.slideTo(slidesNumber - 1);
  });

  swiper.$el.on('click', cssSelectors.petCard, (e: Event) => {
    const target = e.target as Element;
    const petCard = target.closest(cssSelectors.petCard) as HTMLElement;
    const correlationId = petCard.dataset.correlationId;

    if (correlationId) {
      popup.open(+correlationId, baseContentImagesUrl);
    }
  });

  slideGenerator.generateInitialSlides(swiper, baseContentImagesUrl, slidesNumber, petCardsNumber, loop);
};

export const slider = {
  initialize
};
