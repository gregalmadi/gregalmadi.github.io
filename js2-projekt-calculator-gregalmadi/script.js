"use strict";

// HTML selectors
const numpad = document.querySelectorAll(".num");
const clear = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");
const operations = document.querySelectorAll(".op");
const equals = document.querySelector(".equals");
const output = document.querySelector(".display");

let input;

const inputChecker = (input) => {
  output.innerHTML += input;
};

//------------------------------------------------
// Input blockers / enablers
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

//------------------------------------------------
// Operation math
const addition = (a, b) => input.unshift(a + b);
const subtraction = (a, b) => input.unshift(a - b);
const multiplication = (a, b) => input.unshift(a * b);
const division = (a, b) => input.unshift(a / b);

//------------------------------------------------
// All click listeners

// Numbers
const numpadAssoc = [7, 4, 1, 0, 8, 5, 2, 9, 6, 3];

numpad.forEach((num, i) =>
  num.addEventListener("click", () => {
    inputChecker(numpadAssoc[i]);
    removeDisabled(operations);
  })
);

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

const operationsAssoc = [" + ", " - ", " × ", " ÷ "];

operations.forEach((op, i) =>
  op.addEventListener("click", () => {
    inputChecker(operationsAssoc[i]);
    addDisabled(operations);
    decimalEnabler();
  })
);

//------------------------------------------------
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

  if (
    !Number.isNaN(input[0]) &&
    Number.isFinite(input[0]) &&
    Number.isSafeInteger(input[0])
  ) {
    output.innerHTML = input[0];
  } else {
    console.log(input[0]);
    output.innerHTML = "ERR";
  }
});
