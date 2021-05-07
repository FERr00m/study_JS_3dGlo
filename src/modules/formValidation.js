const formValidation = () => {
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
      if (this.value.length !== 18) {
        this.setCustomValidity('Введите номер телефона в формате +7 (***) ***-**-**');
      } else {
        this.setCustomValidity('');
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
      if (!/^\w+@\w+.\w{2,}$/.test(item.value)) {
        item.setCustomValidity('Введите почту в формате example@example.com');
      } else {
        item.setCustomValidity('');
      }
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
};

export default formValidation;
