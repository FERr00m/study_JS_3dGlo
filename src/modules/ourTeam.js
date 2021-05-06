const ourTeam = () => {
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
};

export default ourTeam;
