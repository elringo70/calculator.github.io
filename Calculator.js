export default class Calculator {
  #operation;
  #endOperation;

  constructor(display) {
    this.display = display;
    this.prevNumber = "";
    this.currentNumber = "";
    this.#operation = undefined;
    this.#endOperation = false;
  }

  addNumber(number) {
    this.addNumberValidation(number);
    this.currentNumber = this.currentNumber.toString() + number.toString();
    this.updateDisplay();
  }

  deleteNumber() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
    if (this.currentNumber.length === 0) return;
    this.updateDisplay();
  }

  addNumberValidation(number) {
    if (this.#endOperation) {
      this.reset();
    }

    if (isNaN(this.currentNumber)) {
      this.currentNumber = "";
    }

    if (number === "" && this.currentNumber.split("")[0] === 0) return;
    if (number === "." && this.currentNumber.includes(".")) return;
    if (this.currentNumber.length > 16) return;
  }

  setOperation(operation) {
    if (this.currentNumber === "") return;

    this.prevNumber = this.currentNumber;
    this.currentNumber = "";
    this.#operation = operation;
  }

  changeSign() {
    if (this.currentNumber === "") return;
    this.currentNumber = this.currentNumber * -1;
    this.updateDisplay();
  }

  reset() {
    this.prevNumber = "";
    this.currentNumber = "";
    this.#operation = undefined;
    this.display.innerHTML = "0";
    this.#endOperation = false;
  }

  updateDisplay() {
    this.display.innerHTML = this.currentNumber;
  }

  percentageComputation(prev, current, operation) {
    let result = 0;

    if (operation === "+") {
      result = prev + (prev * current) / 100;
    } else if (operation === "-") {
      result = prev - (prev * current) / 100;
    }

    console.log(prev, current, operation);

    return result;
  }

  mathComputation() {
    if (this.currentNumber === "") return;

    let result;

    const prev = parseFloat(this.prevNumber);
    const current = parseFloat(this.currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.#operation) {
      case "+":
        result = prev + current;
        break;
      case "/":
        result = prev / current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "%":
        break;
      default:
        return;
    }

    if (result === Infinity) {
      this.reset();
      this.currentNumber = "Error";
    } else {
      this.currentNumber = result;
      this.#endOperation = true;
    }
    this.updateDisplay();
  }
}
