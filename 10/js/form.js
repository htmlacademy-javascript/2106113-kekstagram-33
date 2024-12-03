import {isEscapeKey} from'./utils';

import { onEffectChange } from './form-photo-effects';
const effects = document.querySelector('.effects__list');

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const overlayCloseButton = imgUploadForm.querySelector('.img-upload__cancel');

const uploadFormInputsContainer = imgUploadForm.querySelector('.img-upload__field-wrapper');
const imgUploadInputs = uploadFormInputsContainer.querySelectorAll('input, textarea');

const resetImageInputValue = () => {
  imgUploadInput.value = null;
};

const onDocumentKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    for (const elem of imgUploadInputs) {
      if (document.activeElement === elem) {
        evt.stopPropagation();
        return;
      }
    }
    closeOverlay();
  }
};

function openOverLay(evt) {

  evt.preventDefault();

  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
  effects.addEventListener('change', onEffectChange);
}

function closeOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetImageInputValue();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

imgUploadInput.addEventListener('change', openOverLay);
overlayCloseButton.addEventListener('click', closeOverlay);
