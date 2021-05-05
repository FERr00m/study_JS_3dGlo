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

  function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      let i = 0,
        newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }

  }

  const form2Message = document.getElementById('form2-message'),
    userName = document.querySelectorAll('input[name="user_name"]'),
    userMail = document.querySelectorAll('input[name="user_email"]');

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
      item.value = item.value.replace(/[^а-я ]/gi, '');

      if (item.value.length < 2) {
        item.setCustomValidity('Имя должно быть больше одной буквы');
      } else {
        item.setCustomValidity('');
      }
      item.onblur = () => {
        item.value = checkFunc(checkHyphenSpace(item.value));
        item.value = checkName(item.value);
      };
    });
  });

  userMail.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^a-z@\-_.!~*'0-9]/gi, '');
      item.onblur = () => {
        item.value = checkFunc(checkHyphenSpace(item.value));
      };
    });
  });

  maskPhone('.form-phone');

  form2Message.addEventListener('input', () => {
    form2Message.value = form2Message.value.replace(/[a-z]/gi, '');
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

    const updateCounter = num => {
      totalValue.innerText = '0';
      const target = num,
        increment = 500;
      let total = +totalValue.innerText;

      const interval = setInterval(() => {
        if (total < target) {
          totalValue.innerText = total;
          total += increment;
        } else {
          totalValue.innerText = target;
          clearInterval(interval);
        }
      }, 10);
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
        updateCounter(total);
      }
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

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

  //send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      successMessage = 'Спасибо, мы скоро с вами свяжемся!';

    const loadMessage = document.createElement('div');
    loadMessage.classList.add('rotating');
    loadMessage.innerHTML = `
    <div class='sk-folding-cube'>
      <div class='sk-cube sk-cube-1'></div>
      <div class='sk-cube sk-cube-2'></div>
      <div class='sk-cube sk-cube-4'></div>
      <div class='sk-cube sk-cube-3'></div>
    </div>
    `;

    const form1 = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      form3 = document.getElementById('form3'),
      popup = document.querySelector('.popup'),
      rotating = document.querySelector('.rotating');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
    font-size: 2rem; 
    color: #fff;`;

    const clearInputs = form => {
      for (const input of form) {
        if (input.tagName === 'INPUT') {
          input.value = '';
        }
      }
      if (form.id === 'form3') {
        setTimeout(() => {
          popup.style.display = 'none';
        }, 4000);
      }
      setTimeout(() => {
        form.lastChild.remove();
      }, 4000);
    };

    const lastMessage = () => {
      rotating.style.display = 'none';

    };

    form1.addEventListener('submit', event => {
      event.preventDefault();
      statusMessage.textContent = '';
      form1.appendChild(statusMessage);
      rotating.style.display = 'block';

      const formData = new FormData(form1),
        body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network not 200');
          }
          lastMessage();
          clearInputs(form1);
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          lastMessage();
          clearInputs(form1);
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    form2.addEventListener('submit', event => {
      event.preventDefault();
      statusMessage.textContent = '';
      form2.appendChild(statusMessage);
      rotating.style.display = 'block';

      const formData = new FormData(form2),
        body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network not 200');
          }
          lastMessage();
          clearInputs(form2);
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          lastMessage();
          clearInputs(form2);
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    form3.addEventListener('submit', event => {
      event.preventDefault();
      statusMessage.textContent = '';
      form3.appendChild(statusMessage);
      rotating.style.display = 'block';

      const formData = new FormData(form3),
        body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network not 200');
          }
          lastMessage();
          clearInputs(form3);
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          lastMessage();
          clearInputs(form3);
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    // eslint-disable-next-line arrow-body-style
    const postData = body => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };
  };

  sendForm();
});
