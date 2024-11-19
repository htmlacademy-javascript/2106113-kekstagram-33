import {isEscapeKey, isEnterkey} from'./utils';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.big-picture__social').querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.big-picture__social').querySelector('.social__caption');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const commentsFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const onDocumentKeyEnter = function (evt) {
  if (isEnterkey(evt)) {
    evt.preventDefault();
    openFullPhoto();
  }
};
const onDocumentKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const createComment = (element) => {
  const newComment = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');

  newComment.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentImg.src = element.avatar;
  commentImg.alt = element.name;
  commentText.textContent = element.message;

  newComment.appendChild(commentImg);
  newComment.appendChild(commentText);

  commentsFragment.appendChild(newComment);
};

const renderComments = () => {
  commentsList.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  //commentsListCount.innerHTML = `${commentsCount} из ${currentComments.length} комментариев`;
  commentsShowCount.textContent = commentsCount;
  commentsTotal.textContent = currentComments.length;

  commentsSelected.forEach(createComment);

  commentsList.appendChild(commentsFragment);
};

/*const onLoadCommentsButton = function () {
  commentsCount += COMMENTS_STEP;
  renderComments();
};
*/
const openFull = (object) => {
  const {url, likes, description, comments} = object;

  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;

  //commentsShowCount.value = commentsShowCount.textContent;
  //commentsTotal.textContent = comments.length;

  currentComments = comments.slice();

  renderComments();

  openFullPhoto();

};

function openFullPhoto() {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('keydown', onDocumentKeyEnter);
}

function closeFullPhoto() {
  commentsCount = COMMENTS_STEP;
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onDocumentKeyEnter);
}

//commentsLoader.addEventListener('click', onLoadCommentsButton);

bigPictureClose.addEventListener('click', closeFullPhoto);

export { openFull };


