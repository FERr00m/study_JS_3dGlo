// eslint-disable-next-line strict
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calcValidation from './modules/calcValidation';
import formValidation from './modules/formValidation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import SliderCarousel from './modules/sliderCarousel';

//timer
countTimer('29 may 2021');

//меню
toggleMenu();

//popup
togglePopUp();

//smoothScroll
smoothScroll();

//tabs
tabs();

//Slider
slider();

//наша команда
ourTeam();

//калькулятор валидация
calcValidation();

//форма валидация
formValidation();

//calculator
calc(100);

//send-ajax-form
sendForm();

//sliderCarousel
const options = {
  main: '.companies-wrapper',
  wrap: '.companies-hor',
  slidesToShow: 4,
  infinity: true,
  responsive: [
    {
      breakpoint: 1024,
      slidesToShow: 3,
    },
    {
      breakpoint: 768,
      slidesToShow: 2,
    },
    {
      breakpoint: 576,
      slidesToShow: 1,
    }
  ]
};

const carousel = new SliderCarousel(options);

carousel.init();
