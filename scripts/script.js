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

  countTimer('29 may 2021');

  //меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    document.body.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target === menu || target.tagName === 'LI') {
        return;
      } else {
        menu.classList.remove('active-menu');
      }
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
          popupContent.style.top = '-60%';
          animate({
            duration: 700,
            timing: timeFraction => (Math.pow(timeFraction, 2) - 1.15),
            draw: progress => popupContent.style.top = (progress * 80 + 40) + '%',
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

  //Slider

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      //btn = document.querySelectorAll('.portfolio-btn'),
      dots = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    for (let i = 0; i < slide.length; i++) {
      const element = document.createElement('li');
      element.classList.add('dot');
      dots.append(element);
    }
    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 1500) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(1500);
  };

  slider();

  //наша команда

  const command = document.getElementById('command'),
    commandImg = command.querySelectorAll('.command__photo');
  commandImg.forEach(item => {
    item.addEventListener('mouseenter', event => {
      const srcImage = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = srcImage;
    });
    item.addEventListener('mouseout', event => {
      const srcImage = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = srcImage;
    });
  });

  //калькулятор валидация

  const inputsCalc = document.querySelectorAll('.calc-block>input');

  inputsCalc.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, '');
    });
  });

  //форма валидация

  const form2Message = document.getElementById('form2-message'),
    userName = document.querySelectorAll('input[name="user_name"]'),
    userMail = document.querySelectorAll('input[name="user_email"]'),
    userPhone = document.querySelectorAll('input[name="user_phone"]');

  const checkFunc = str => {
    str = str.trim();
    str = str.replace(/ {2,}/g, ' ');
    str = str.replace(/-{2,}/g, '-');
    return str;
  };

  const checkHyphenSpace = str => {
    str = str.trim();
    str = str.replace(/^-*/, '');
    str = str.replace(/-*$/, '');
    return str;
  };

  const checkName = str => {
    const tmpStr = str.split(' ');
    tmpStr.forEach((item, i) => {
      if (/.*-.*/.test(item)) {
        const tmpItem = item.split('-'),
          tmpArr = [];
        tmpItem.forEach(item => {
          tmpArr.push(item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase());
        });
        tmpStr[i] = tmpArr.join('-');
      } else {
        tmpStr[i] = item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
      }
    });
    return tmpStr.join(' ');
  };

  userName.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^а-я\- ]/gi, '');
      item.onblur = () => {
        item.value = checkFunc(checkHyphenSpace(item.value));
        item.value = checkName(item.value);
      };
    });
  });

  userMail.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '');
      item.onblur = () => {
        item.value = checkFunc(checkHyphenSpace(item.value));
      };
    });
  });

  userPhone.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^0-9()-]/gi, '');
      item.onblur = () => {
        item.value = checkFunc(checkHyphenSpace(item.value));
      };
    });
  });

  form2Message.addEventListener('input', () => {
    form2Message.value = form2Message.value.replace(/[^а-я\- ]/gi, '');
    form2Message.onblur = () => {
      form2Message.value = checkFunc(checkHyphenSpace(form2Message.value));
    };
  });

  //calculator


  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    //calcanimation
    const time = 500, //ms
      step = 10;

    const outNum = num => {
      calcType.disabled = true;
      calcSquare.disabled = true;
      calcDay.disabled = true;
      calcCount.disabled = true;
      let n = 0;
      const t = time / (num / step),
        l = totalValue;
      const interval = setInterval(() => {
        n += step;
        if (n === num) {
          calcType.disabled = false;
          calcSquare.disabled = false;
          calcDay.disabled = false;
          calcCount.disabled = false;
          clearInterval(interval);
        }
        l.textContent = n;
      },
      t);
    };

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
        total = Math.round(total);
        outNum(total);
      }
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;
      console.log(calcType.value);
      //console.dir(target);
      if (calcType.value === '') {
        calcSquare.value = '';
        calcDay.value = '';
        calcCount.value = '';
        totalValue.textContent = '0';
      }

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };

  calc(100);
});
