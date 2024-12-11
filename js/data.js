import { getRandomInteger, getRandomArrayElement } from './utils.js';

const DESCRIPTIONS = [
  'Как же красиво!',
  'Посмотрите, какой вид!',
  'Стиль, это всё',
  'Разве это не прекрасно?',
  'Фото, возможность запечатлеть момент своей жизни',
];

const NAMES = [
  'Дмитрий',
  'Андрей',
  'Артём',
  'Алексей',
  'Евгений',
  'Сергей',
  'Владимир',
  'Анна',
  'Юлия',
  'Анастасия',
  'Ксения',
  'Кристина',
  'Светлана',
  'Александра'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PARAMETERS = {
  photosCount: 25,
  photosIdMin: 1,
  photosIdMax: 25,
  urlMin: 1,
  urlMax: 25,
  likesMin: 15,
  likesMax: 200,
  commentsMin: 0,
  commentsMax: 30,
  avatarMin: 1,
  avatarMax: 6,
};

// Получение  не повторяющегося ID (идентификатора)//
const createRandomId = () => {
  let currentValue = 0;
  return () => ++currentValue;
};

const randomIdPhoto = createRandomId();
const randomIdComments = createRandomId();

// Получение  не повторяющегося url //
const getRandomUrl = () => {
  let currentValue = 0;
  return () => `photos/${++currentValue}.jpg`;
};

const randomUrl = getRandomUrl();

// Получение  случайного аватара //
const getRandomAvatar = (min, max) => {
  const randomAvatar = getRandomInteger(min, max);
  return `img/avatar-${randomAvatar}.svg`;
};

//Создание комментария//
const createComment = () =>
  ({
    id: randomIdComments(),
    avatar: getRandomAvatar(PARAMETERS.avatarMin, PARAMETERS.avatarMax),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  });

//Создание описания фотографии//
const createPhoto = () =>
  ({
    id: randomIdPhoto(),
    url: randomUrl(),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(PARAMETERS.likesMin, PARAMETERS.likesMax),
    comments: Array.from({length: getRandomInteger(PARAMETERS.commentsMin, PARAMETERS.commentsMax)}, createComment)
  });

const photoObjects = Array.from({length: PARAMETERS.photosCount}, createPhoto);

export { photoObjects };
