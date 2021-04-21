// eslint-disable-next-line strict
'use strict';

const declensionOfEndings = function(number, one, two, five) {
  const strNumber = String(number);
  if ('567890'.includes(strNumber.slice(-1)) || 11 <= +(strNumber.slice(-2)) && +(strNumber.slice(-2)) <= 14) {
    return five;
  } else if ('1'.includes(strNumber.slice(-1))) {
    return one;
  } else if ('234'.includes(strNumber.slice(-1))) {
    return two;
  }
};

const declensionOfDay = time => {
  if (time >= 6 && time < 12) {
    return 'ое утро';
  } else if (time >= 12 && time < 18) {
    return 'ый день';
  } else if (time >= 18 && time < 0) {
    return 'ый вечер';
  } else if (time >= 0 && time < 6) {
    return 'ой ночи';
  }
};

const getTimeRemaining = deadline => {
  const dateStop = new Date(deadline).getTime(),
    dateNow = new Date().getTime(),
    timeRemaining = (dateStop - dateNow) / 1000, //Для проверок -39250,
    day = Math.floor(timeRemaining / 60 / 60 / 24);
  return day;
};

let date = new Date();

const day = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const caseA = document.createElement('p'),
  caseB = document.createElement('p'),
  caseC = document.createElement('p'),
  caseD = document.createElement('p');



setInterval(() => {
  const remainDays = getTimeRemaining('1 january 2022');
  date = new Date();
  caseA.innerHTML = ('Добр' + declensionOfDay(date.getHours()) + '!');
  caseB.innerHTML = ('Сегодня: ' + day[date.getDay()]);
  caseC.innerHTML = ('Текущее время: ' + date.toLocaleTimeString('en'));
  caseD.innerHTML = ('До нового года осталось ' + remainDays + ' ' +
   declensionOfEndings(remainDays, 'день', 'дня', 'дней'));

  document.body.appendChild(caseA);
  document.body.appendChild(caseB);
  document.body.appendChild(caseC);
  document.body.appendChild(caseD);
}, 1000);
