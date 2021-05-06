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

export default togglePopUp;
