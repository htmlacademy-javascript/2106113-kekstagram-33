import { isEscapeKey } from'./utils';
import { pristine } from './form-validation';
import { onEffectChange } from './form-photo-effects';

const imgUploadForm = document.querySelector('.img-upload__form');

const imgUploadComment = document.querySelector('.text__description');
const imgUploadHashtag = document.querySelector('.text__hashtags');
const sizeValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const noneEffect = document.querySelector('#effect-none');

const effects = document.querySelector('.effects__list');

const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const overlayCloseButton = imgUploadForm.querySelector('.img-upload__cancel');

const resetImageInputValue = () => {
  imgUploadInput.value = null;
};

const onDocumentKeyDown = function (evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    onCloseOverlay();
  }
};

function onOpenOverLay(evt) {

  evt.preventDefault();

  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
  effects.addEventListener('change', onEffectChange);
}

function onCloseOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetImageInputValue();
  imgUploadComment.value = '';
  imgUploadHashtag.value = '';
  sizeValue.value = '100%';
  const sizeValueNum = parseInt(sizeValue.value, 10);
  imgUploadPreview.style.transform = `scale(${sizeValueNum.value})`;
  imgUploadPreview.style.transform = '';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.add('hidden');
  imgUploadPreview.style.filter = 'none';
  noneEffect.checked = true;
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

imgUploadInput.addEventListener('change', onOpenOverLay);
overlayCloseButton.addEventListener('click', onCloseOverlay);

export { onOpenOverLay, onCloseOverlay };
