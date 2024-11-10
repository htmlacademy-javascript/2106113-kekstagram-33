import {photoObjects} from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const usersPicturesList = document.querySelector('.pictures');
const usersPictures = photoObjects();

const usersPicturesFragment = document.createDocumentFragment();

usersPictures.forEach(({url, description, likes, comments}) => {
  const photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  usersPicturesFragment.appendChild(photoElement);
});

usersPicturesList.appendChild(usersPicturesFragment);

