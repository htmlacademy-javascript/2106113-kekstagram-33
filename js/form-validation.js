const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadComment = document.querySelector('.text__description');
const imgUploadHashtag = document.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    imgUploadForm.submit();
  }
});

export { pristine };
