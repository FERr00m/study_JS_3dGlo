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

export default calc;
