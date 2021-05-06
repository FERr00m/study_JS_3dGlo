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
};

export default sendForm;
