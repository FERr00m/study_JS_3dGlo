const smoothScroll = () => {
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
};

export default smoothScroll;
