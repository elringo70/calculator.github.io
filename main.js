import Calculator from "./Calculator.js";
const calculator = new Calculator(document.getElementById("display"));

const btnNumbers = Array.from(document.getElementsByClassName("btn-number"));
const operations = Array.from(document.getElementsByClassName("operation"));

btnNumbers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    calculator.addNumber(e.target.value);
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!["+", "-", "/", "*"].includes(e.target.value)) return;
    calculator.setOperation(e.target.value);
  });
});

document.getElementById("c").addEventListener("click", () => {
  calculator.deleteNumber();
});

document.getElementById("result").addEventListener("click", () => {
  calculator.mathComputation();
});

document.getElementById("ce").addEventListener("click", () => {
  calculator.reset();
  display.innerHTML = "0";
});

document.getElementById("invert").addEventListener("click", () => {
  calculator.changeSign();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") return deleteNumber();
  addKeyNumber(e.key);
});

const container = document.getElementById("container");

window.onload = () => {
  const height = window.innerHeight;
  container.style.height = height;
};

window.onresize = () => {
  let height = window.innerHeight;
  container.style.height = height;
};

const addKeyNumber = (number) => {
  const regex = new RegExp(/^[0-9]*\.?[0-9]*$/);

  if (regex.test(number)) {
    calculator.addNumber(number);
  }
};

const deleteNumber = () => {
  calculator.deleteNumber();
};
