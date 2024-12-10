import { openFull } from './big-pictures';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPicturesFragment = document.createDocumentFragment();

const usersPicturesContainer = document.querySelector('.pictures');

const renderPosts = (objects) => {
  objects.forEach((object) => {
    const {url, description, likes, comments} = object;
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFull(object);
    });
    usersPicturesFragment.appendChild(photoElement);
  });
  usersPicturesContainer.appendChild(usersPicturesFragment);
};

export { renderPosts };

