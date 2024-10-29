const DESCRIPTION = [
  'Как же красиво!',
  'Посмотрите, какой вид!',
  'Стиль, это всё',
  'Разве это не прекрасно?',
  'Фото, возможность запечатлеть момент своей жизни',
];

const NAME = [
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

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Получение случайного числа //

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Получение  ID (идентификатора)//

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const randomIdPhoto = createRandomId(1, 25);
const randomIdComments = createRandomId(1, 100);

// Получение  случайного url //
const getRandomUrl = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return `photos/${currentValue}.jpg`;
  };
};

const randomUrl = getRandomUrl(1, 25);

// Получение  случайного аватара //
const getRandomAvatar = (min, max) => {
  const randomAvatar = getRandomInteger(min, max);
  return `img/avatar-${randomAvatar}.svg`;
};

// Получение  случайного индекса массива //
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () =>
  ({
    id: randomIdComments(1, 100),
    avatar: getRandomAvatar(1, 6),
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME)
  });

const createPhoto = () => {
  const numberOfComments = getRandomInteger(0, 30);
  return {
    id: randomIdPhoto(1, 25),
    url: randomUrl(1, 25),
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: numberOfComments}, createComment)
  };
};

const photoObjects = Array.from({length: 25}, createPhoto);

//Ради исключения ошибки линтера//
const test = () => photoObjects;
test();
