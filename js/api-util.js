import { isEscapeKey } from'./utils';

const ALERT_SHOW_TIME = 5000;
const thumbnailsErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

const showModal = (element, prefix) => {
  body.append(element);

  const onModalEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      removeModal();
    }
  };

  const onCloseClick = (evt) => {
    if (evt.target.matches(`.${prefix}__button`) || !evt.target.closest(`.${prefix}__inner`)) {
      removeModal();
    }
  };

  function removeModal() {
    element.remove();
    body.removeEventListener('keydown', onModalEscape);
  }

  element.addEventListener('click', onCloseClick);

  body.addEventListener('keydown', onModalEscape);
};

const showErrorMessage = () => {
  const errorElement = thumbnailsErrorTemplate.cloneNode(true);
  body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showErrorMessage, showModal };
