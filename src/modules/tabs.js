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

export default tabs;
