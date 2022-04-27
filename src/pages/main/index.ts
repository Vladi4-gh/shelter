import '../common';
import { burgerMenu } from '../../scripts/common/burger-menu/burgerMenu';
import { slider } from '../../scripts/common/slider/slider';
import './styles.scss';

burgerMenu.initialize();

const baseContentImagesUrl = './static/content/images/pets/';

slider.initialize(
  baseContentImagesUrl,
  [
    {
      maxWidth: 708,
      slidesNumber: 3,
      petCardsNumber: 1
    },
    {
      maxWidth: 1200,
      slidesNumber: 3,
      petCardsNumber: 2
    },
    {
      maxWidth: Infinity,
      slidesNumber: 3,
      petCardsNumber: 3
    }
  ],
  true
);
