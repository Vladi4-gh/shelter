import '../common';
import { burgerMenu } from '../../scripts/common/burger-menu/burgerMenu';
import { slider } from '../../scripts/common/slider/slider';
import './styles.scss';

burgerMenu.initialize();

const baseContentImagesUrl = '../static/content/images/pets/';

slider.initialize(baseContentImagesUrl, [
  {
    maxWidth: 708,
    slidesNumber: 16,
    petCardsNumber: 3
  },
  {
    maxWidth: 1200,
    slidesNumber: 8,
    petCardsNumber: 6
  },
  {
    maxWidth: Infinity,
    slidesNumber: 6,
    petCardsNumber: 8
  }
]);
