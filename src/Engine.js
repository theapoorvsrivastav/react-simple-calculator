class Engine {
  constructor() {
    this.number = "";

    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.repeatNumber = null;
    this.repeatOperation = null;
    this.clearable = false;

    this.OperationEnum = {
      addition: "Add (+)",
      subtraction: "Subtract (-)",
      multiplication: "Multiply (X)",
      division: "Divide (\u00F7)",
      equal: "=",
      sign: "+/-",
      allClear: "Clear",
      square: "^2",
      squareRoot: "Sq root"
    };
  }

  updatePreviousStatus(number, input) {
    this.previousNumber = number;
    this.previousInput = input;
    this.previousOperation = input;
  }

  // Handle and process all digit inputs including .
  handleDigitInput(input) {
    this.clearable = true;
    if (this.isOperation(this.previousInput)) {
      this.number = "";
    }
    this.number += input;
    this.previousInput = input;
    return this.removeZero(this.number);
  }

  // Handle all operation other than digit inputs.
  handleOperationInput(input) {
    if (
      input === this.OperationEnum.addition ||
      input === this.OperationEnum.subtraction ||
      input === this.OperationEnum.multiplication ||
      input === this.OperationEnum.division
    ) {
      return this.handleBasicMathOperation(input);
    }

    if (input === this.OperationEnum.sign) {
      return this.handleSignOperation();
    }

    if (input === this.OperationEnum.allClear) {
      return this.handleAllClearOperation();
    }

    if (input === this.OperationEnum.equal) {
      return this.handleEqualOperation(input);
    }
    if(input === this.OperationEnum.square){
      return this.handleSquareOperation(input);

    }
    if(input === this.OperationEnum.squareRoot){
      return this.handleSquareRootOperation(input);
    }
  }

  // Only handle basic +, -, /, x operations
  handleBasicMathOperation(input) {
    this.repeatNumber = null;
    this.repeatOperation = null;
    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.number, input);
      return this.number;
    } else {
      let temp = this.previousInput;
      this.previousInput = input;
      if (
        temp !== input &&
        this.previousOperation !== this.OperationEnum.equal &&
        temp !== "="
      ) {
        if (this.previousOperation === this.OperationEnum.addition) {
          this.number = this.add(this.previousNumber, this.number);
        }
        if (this.previousOperation === this.OperationEnum.subtraction) {
          this.number = this.subtract(this.previousNumber, this.number);
        }
        if (this.previousOperation === this.OperationEnum.multiplication) {
          this.number = this.muliply(this.previousNumber, this.number);
        }
        if (this.previousOperation === this.OperationEnum.division) {
          this.number = this.divide(this.previousNumber, this.number);
        }
        this.updatePreviousStatus(this.number, input);
        return this.number;
      } else {
        this.updatePreviousStatus(this.number, input);
        return this.number;
      }
    }
  }

  handleSignOperation() {
    if (this.number === "") {
      this.number = "0";
    }
    this.number = this.changeSign(this.number);
    return this.number;
  }

  handleAllClearOperation() {
    return this.allClear();
  }

  handleSquareOperation(){
    if(this.number === ""){
      this.number = "0";
    }
    this.number = this.square(this.number);
    return this.number;
  }

  handleSquareRootOperation(){
    if(this.number === ""){
      this.number= "0";
    }
    this.number = this.squareRoot(this.number);
    return this.number;
  }

  // Paramter operation is one of add, subtract, multiply or divide
  perform(operation) {
    if (this.repeatNumber !== null) {
      this.number = operation(this.number, this.repeatNumber);
    } else {
      this.repeatNumber = this.number;
      this.number = operation(this.previousNumber, this.number);
    }
  }

  handleEqualOperation(input) {
    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.number, input);
      return this.number;
    } else {
      this.previousInput = input;
      if (
        this.previousOperation !== this.OperationEnum.equal &&
        input === this.OperationEnum.equal
      ) {
        let temp = this.number;

        if (this.previousOperation === this.OperationEnum.addition) {
          this.perform(this.add);
        }
        if (this.previousOperation === this.OperationEnum.subtraction) {
          this.perform(this.subtract);
        }
        if (this.previousOperation === this.OperationEnum.multiplication) {
          this.perform(this.muliply);
        }
        if (this.previousOperation === this.OperationEnum.division) {
          this.perform(this.divide);
        }
        this.repeatNumber = temp;
        this.repeatOperation = this.previousOperation;
        this.previousInput = input;
        this.previousOperation = input;
        return this.number;
      } else {
        let temp = this.number;
        if (this.repeatNumber != null) {
          if (this.repeatOperation === this.OperationEnum.addition) {
            this.number = this.add(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.subtraction) {
            this.number = this.subtract(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.multiplication) {
            this.number = this.muliply(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.division) {
            this.number = this.divide(this.number, this.repeatNumber);
          }
        }
        this.updatePreviousStatus(temp, input);
        return this.number;
      }
    }
  }

  calculate(input) {
    if (this.isDigit(input)) {
      return this.handleDigitInput(input);
    }
    if (this.isOperation(input)) {
      return this.handleOperationInput(input);
    }
    return "Error";
  }

  isDigit(input) {
    return !isNaN(input) || input === ".";
  }

  isOperation(input) {
    return Object.values(this.OperationEnum).includes(input);
  }

  add(previousNumber, number) {
    return (parseFloat(previousNumber) + parseFloat(number)).toString();
  }

  subtract(previousNumber, number) {
    return (parseFloat(previousNumber) - parseFloat(number)).toString();
  }

  muliply(previousNumber, number) {
    return (parseFloat(previousNumber) * parseFloat(number)).toString();
  }

  divide(previousNumber, number) {
    return (parseFloat(previousNumber) / parseFloat(number)).toString();
  }

  changeSign(number) {
    return parseFloat(number) === 0
      ? "0"
      : (parseFloat(number) * -1).toString();
  }

  square(number){
    return (parseFloat(number) * parseFloat(number)).toString();
  }

  squareRoot(number){
    return (Math.sqrt(parseFloat(number))).toString();
  }

  allClear() {
    this.number = "";
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.repeatNumber = null;
    this.repeatOperation = null;
    this.clearable = false;

    return "0";
  }

  removeZero(number) {
    if (number.length > 1 && number[0] === "0" && number[1] !== ".") {
      return this.removeZero(number.substr(1, number.length));
    }
    return number;
  }
}

export default Engine;
