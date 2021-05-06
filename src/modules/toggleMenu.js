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

export default toggleMenu;
