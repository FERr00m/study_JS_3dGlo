window.addEventListener('DOMContentLoaded', () => {
  'strict';

  //timer
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
    const idInterval = setInterval(updateClock);
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
  }

  countTimer('24 april 2021');

  //меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = event => {
      const target = event.target;
      if (target.tagName === 'A') {
        menu.classList.toggle('active-menu');
      }
    };

    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('active-menu');
      menu.addEventListener('click', handlerMenu);
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');

    const animate = ({ timing, draw, duration }) => {
      const start = performance.now();
      requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // вычисление текущего состояния анимации
        const progress = timing(timeFraction);
        draw(progress); // отрисовать её
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    };

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        if (document.documentElement.clientWidth < 768) {
          popup.style.display = 'block';
        } else {
          popup.style.display = 'block';
          popupContent.style.top = '-30%';
          animate({
            duration: 700,
            timing: timeFraction => (Math.pow(timeFraction, 2) - 1.5),
            draw: progress => popupContent.style.top = (progress * 60 + 40) + '%',
          });
        }
      });
    });

    popup.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };
  togglePopUp();

  //smoothScroll
  const scrollLinks = document.querySelectorAll('.scroll-link');

  scrollLinks.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      const id = item.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  //tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabCotent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabCotent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabCotent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabCotent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});
