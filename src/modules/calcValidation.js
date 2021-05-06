const calcValidation = () => {
  const inputsCalc = document.querySelectorAll('.calc-block>input');

  inputsCalc.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, '');
    });
  });
};

export default calcValidation;
