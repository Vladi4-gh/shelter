import { attributes } from './attributes';
import { cssSelectors } from './cssSelectors';

const open = () => {
  const burgerMenu = document.querySelector(cssSelectors.burgerMenu);

  if (burgerMenu) {
    burgerMenu.setAttribute(attributes.opened, '');
  }

  const burgerMenuButton = document.querySelector(cssSelectors.burgerMenuButton);

  if (burgerMenuButton) {
    burgerMenuButton.setAttribute(attributes.opened, '');
  }

  const burgerMenuOverlayLeft = document.createElement('div');

  burgerMenuOverlayLeft.className = `${cssSelectors.burgerMenuOverlay.slice(1)} ${cssSelectors.burgerMenuOverlayLeft.slice(1)}`;
  burgerMenuOverlayLeft?.addEventListener('click', () => close());
  document.body.appendChild(burgerMenuOverlayLeft);

  const burgerMenuOverlayRight = document.createElement('div');

  burgerMenuOverlayRight.className = `${cssSelectors.burgerMenuOverlay.slice(1)} ${cssSelectors.burgerMenuOverlayRight.slice(1)}`;
  burgerMenuOverlayRight?.addEventListener('click', () => close());
  document.body.appendChild(burgerMenuOverlayRight);

  document.body.classList.add(cssSelectors.hideScrollbarY.slice(1));

  const header = document.querySelector(cssSelectors.header);

  if (header) {
    header.setAttribute(attributes.opened, '');
  }
};

const close = () => {
  const burgerMenu = document.querySelector(cssSelectors.burgerMenu);

  if (burgerMenu) {
    burgerMenu.removeAttribute(attributes.opened);
  }

  const burgerMenuButton = document.querySelector(cssSelectors.burgerMenuButton);

  if (burgerMenuButton) {
    burgerMenuButton.removeAttribute(attributes.opened);
  }

  const burgerMenuOverlay = document.querySelectorAll(cssSelectors.burgerMenuOverlay);

  Array.from(burgerMenuOverlay).forEach((x) => x.remove());

  document.body.classList.remove(cssSelectors.hideScrollbarY.slice(1));

  const header = document.querySelector(cssSelectors.header);

  if (header) {
    header.removeAttribute(attributes.opened);
  }
};

const initialize = () => {
  const burgerMenuButton = document.querySelector(cssSelectors.burgerMenuButton);

  if (burgerMenuButton) {
    burgerMenuButton.addEventListener('click', (e: Event) => {
      const button = e.currentTarget as HTMLElement;
      const isMenuOpened = button.hasAttribute(attributes.opened);

      if (isMenuOpened) {
        close();
      } else {
        open();
      }
    });
  }

  const burgerMenu = document.querySelector(cssSelectors.burgerMenu);

  if (burgerMenu) {
    burgerMenu.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const isCloseMenu = target.hasAttribute(attributes.closeBurgerMenu);

      if (isCloseMenu) {
        close();
      }
    });
  }
};

export const burgerMenu = {
  initialize
};
