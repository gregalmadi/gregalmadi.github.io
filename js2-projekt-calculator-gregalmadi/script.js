"use strict";

// HTML selectors
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");

const clear = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");

const add = document.querySelector(".add");
const subtract = document.querySelector(".subtract");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");
const equals = document.querySelector(".equals");
const operations = document.querySelectorAll(".operations div");

const output = document.querySelector(".display");

let input;

const inputChecker = (number) => {
  output.innerHTML += number;
};

const removeDisabled = (element) => {
  element.forEach((e) => {
    e.classList.remove("disabled");
  });
};

const addDisabled = (element) => {
  element.forEach((e) => {
    e.classList.add("disabled");
  });
};

const decimalEnabler = () => {
  decimal.classList.remove("disabled");
};

const decimalDisabler = () => {
  decimal.classList.add("disabled");
};

addDisabled(operations);

// Operation math
const addition = (a, b) => input.unshift(a + b);
const subtraction = (a, b) => input.unshift(a - b);
const multiplication = (a, b) => input.unshift(a * b);
const division = (a, b) => input.unshift(a / b);

// All click listeners

//Numbers
one.addEventListener("click", () => {
  inputChecker(1);
  removeDisabled(operations);
});
two.addEventListener("click", () => {
  inputChecker(2);
  removeDisabled(operations);
});
three.addEventListener("click", () => {
  inputChecker(3);
  removeDisabled(operations);
});
four.addEventListener("click", () => {
  inputChecker(4);
  removeDisabled(operations);
});
five.addEventListener("click", () => {
  inputChecker(5);
  removeDisabled(operations);
});
six.addEventListener("click", () => {
  inputChecker(6);
  removeDisabled(operations);
});
seven.addEventListener("click", () => {
  inputChecker(7);
  removeDisabled(operations);
});
eight.addEventListener("click", () => {
  inputChecker(8);
  removeDisabled(operations);
});
nine.addEventListener("click", () => {
  inputChecker(9);
  removeDisabled(operations);
});
zero.addEventListener("click", () => {
  inputChecker(0);
  removeDisabled(operations);
});

// Special
clear.addEventListener("click", () => {
  output.innerHTML = "";
  addDisabled(operations);
  decimalEnabler();
});
decimal.addEventListener("click", () => {
  inputChecker(".");
  addDisabled(operations);
  decimalDisabler();
});

// Operations
add.addEventListener("click", () => {
  inputChecker(" + ");
  addDisabled(operations);
  decimalEnabler();
});

subtract.addEventListener("click", () => {
  inputChecker(" - ");
  addDisabled(operations);
  decimalEnabler();
});

divide.addEventListener("click", () => {
  inputChecker(" ÷ ");
  addDisabled(operations);
  decimalEnabler();
});

multiply.addEventListener("click", () => {
  inputChecker(" × ");
  addDisabled(operations);
  decimalEnabler();
});

// Calculation logic
equals.addEventListener("click", () => {
  input = output.innerHTML.split(" ");

  while (input.length > 2) {
    let number1 = String(input.shift());
    number1.includes(".")
      ? (number1 = parseFloat(number1))
      : (number1 = Number(number1));
    let operation = input.shift();
    let number2 = String(input.shift());
    number2.includes(".")
      ? (number2 = parseFloat(number2))
      : (number2 = Number(number2));

    switch (operation) {
      case "+":
        addition(number1, number2);
        break;
      case "-":
        subtraction(number1, number2);
        break;
      case "×":
        multiplication(number1, number2);
        break;
      case "÷":
        division(number1, number2);
        break;
    }
  }

  output.innerHTML = input;
});
