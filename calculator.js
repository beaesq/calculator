let currentString = '';
let previousValue = 0, currentValue = 0;
let currentOperation = '';
let isOperandLastPressed = false;
let isNumberFloat = false;
let currentSign = true;

// Operation functions
function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

function operate (operator, num1, num2) {
  switch (operator) {
    case 'add':
      return add(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    case 'divide':
      return divide(num1, num2);
  };
}

// Button functions
function sendNumber (btn) {
  const div = document.getElementById('display');
  if (div.textContent == '0' || isOperandLastPressed) {
    div.textContent = '';
    isOperandLastPressed = false;
  }
  
  div.textContent += btn;
  currentString += btn;
  //console.log (currentString);
}

function sendDot () {
  const div = document.getElementById('display');
  if (!isNumberFloat && !isOperandLastPressed) {
    div.textContent += '.';
    currentString += '.';
    isNumberFloat = true;
  }
}

function setOperation (btn) {
  if (isOperandLastPressed == false) {
    doOperation();
  }
  // console.log(`${previousValue} ${currentOperation} ${currentValue}`);

  updateDisplay();

  currentOperation = btn;
  // console.log(currentOperation);
}

function setSign () {
  const div = document.getElementById('display');
  if (isOperandLastPressed) {
    div.textContent = '0';
    return;
  }
  
  if (currentSign) {
    currentString = '-' + currentString;
  } else {
    currentString = currentString.replace('-', ''); 
  }
  currentSign = !currentSign
  div.textContent = currentString;
}

function doOperation () {
  previousValue = currentValue;
  currentValue = +currentString;
  currentString = '';
  isOperandLastPressed = true;
  isNumberFloat = false;
  currentSign = true;
  switch (currentOperation) {
    case 'add':
      currentValue = add(previousValue, currentValue);
      break;
    case 'sub':
      currentValue = subtract(previousValue, currentValue);
      break;
    case 'mul':
      currentValue = multiply(previousValue, currentValue);
      break;
    case 'div':
      currentValue = divide(previousValue, currentValue);
      break;
  }
}

function sendEqual () {
  doOperation();
  updateDisplay();
  currentOperation = '';
  previousValue = 0;
  currentSign = true;
}

function updateDisplay () {
  const div = document.getElementById('display');
  if (currentValue == Infinity) {
    div.textContent = "error";
  } else {
    div.textContent = Math.round(currentValue * 10000) / 10000;
  }
}

function clearAll () {
  currentString = '';
  previousValue = 0, currentValue = 0;
  currentOperation = '';
  isOperandLastPressed = false;
  isNumberFloat = false;
  currentSign = true;
  updateDisplay();
}

function clearLast () {
  if (currentString == '' || currentString == '0') {
    return;
  } else {
    const div = document.getElementById('display');
    currentString = currentString.slice(0, currentString.length - 1);
    if (currentString == '') {
      div.textContent = '0';
    } else {
      div.textContent = currentString;
    }
  }
}