window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //timer
  let idInterval = null;
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function checkZero(number) {
      const stringNumber = String(number);
      if (stringNumber.length === 1) {
        return ('0' + stringNumber);
      }
      return number;
    }

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000, //Для проверок -39250,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
        //day = Math.floor(timeRemaining / 60 / 60 / 24);
      return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = checkZero(timer.hours);
      timerMinutes.textContent = checkZero(timer.minutes);
      timerSeconds.textContent = checkZero(timer.seconds);

      if (Math.floor(timer.timeRemaining) <= 0) {
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        const timerDiv = document.getElementById('timer');
        let timerSpans = timerDiv.getElementsByTagName('span');
        timerSpans = Array.from(timerSpans);
        timerSpans.forEach(item => {
          item.style.color = 'red';
        });
      }
    }

    updateClock();
  }
  idInterval = setInterval(countTimer, 1000, '22 april 2021');

});
