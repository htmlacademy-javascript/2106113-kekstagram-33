
import {showErrorMessage} from './api-util';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = (onSuccess) => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => response.json())
  .then((photoObjects) => {
    onSuccess(photoObjects);
  })
  .catch(() => {
    showErrorMessage();
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error();
  });

export { getData, sendData };
