// Функция для проверки длины строки //

function getStringLength (string, length) {
  return string.length <= length;
}

getStringLength('проверяемая строка', 20); // true
getStringLength('проверяемая строка', 18); // true
getStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом //

function getPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString === string;
}

getPalindrome('топот'); // true
getPalindrome('ДовОд'); // true
getPalindrome('Кекс'); // false

getPalindrome('Лёша на полке клопа нашёл '); // true

/* Функция принимает строку,
извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. */

function getNumber (string) {
  const newString = string.toString();
  let toNumber = '';
  for (let i = 0; i <= newString.length - 1; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      toNumber += newString[i];
    }
  }
  if (toNumber === '') {
    return NaN;
  }
  return parseInt(toNumber, 10);
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15

/* Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах
и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит */

const getTime = (workStart, workEnd, meetStart, meetTime) => {

  workStart = Number(workStart.split(':')[0]) * 60 + Number(workStart.split(':')[1]);
  workEnd = Number(workEnd.split(':')[0]) * 60 + Number(workEnd.split(':')[1]);
  meetStart = Number(meetStart.split(':')[0]) * 60 + Number(meetStart.split(':')[1]);

  if (meetStart < workStart) {
    return false;
  }
  if (meetStart + meetTime > workEnd) {
    return false;
  }
  return true;

};


getTime('08:00', '17:30', '14:00', 90); // true
getTime('8:0', '10:0', '8:0', 120); // true
getTime('08:00', '14:30', '14:00', 90); // false
getTime('14:00', '17:30', '08:0', 90); // false
getTime('8:00', '17:30', '08:00', 900); // false
