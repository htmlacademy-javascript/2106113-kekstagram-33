import { sendData } from './api';
import { showModal } from './api-util';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadComment = document.querySelector('.text__description');
const imgUploadHashtag = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');

const formSuccesTemplate = document.querySelector('#success').content.querySelector('.success');

const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'ПУБЛИКУЕМ...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
};

function validateComments (value) {
  return value.length <= 140;
}

pristine.addValidator(imgUploadHashtag, (value) => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashtags.every((tag) => hashtagPattern.test(tag));
}, 'Хэштег должен начинаться с # и содержать только буквы и цифры');


pristine.addValidator(imgUploadHashtag, (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashtags.every((tag) => tag.length <= 20);
}, 'Максимальная длина одного хэштега - 20 символов');


pristine.addValidator(imgUploadHashtag, (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashtags.length <= 5;
}, 'Нельзя указать больше 5 хэштегов');


pristine.addValidator(imgUploadHashtag, (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  const lowerCasedTags = hashtags.map((tag) => tag.toLowerCase());
  return new Set(lowerCasedTags).size === lowerCasedTags.length;
}, 'Хэштеги не должны повторяться');


pristine.addValidator(imgUploadComment, validateComments, 'Максимальная длина комментария 140 символов');

const setImgFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
        })
        .then(unblockSubmitButton)
        .then(() => {
          const succesElement = formSuccesTemplate.cloneNode(true);
          showModal(succesElement, 'success');
        })
        .catch(() => {
          const errorElement = formErrorTemplate.cloneNode(true);
          showModal(errorElement, 'error');
          unblockSubmitButton();
        });
    }
  });
};

export { pristine, setImgFormSubmit };
