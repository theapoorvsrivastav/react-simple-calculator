import React from 'react';
import Engine from './Engine.js';
import Display from './Display.js';
import Button from './Button.js';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      engine: new Engine(),
      isScientificEnabled: true
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleScienceClick = this.handleScienceClick.bind(this);
  }

  handleButtonClick(value) {
    this.setState({
      display: this.state.engine.calculate(value),
    });
  }

  handleScienceClick() {
    this.setState({
      isScientificEnabled: !this.state.isScientificEnabled
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display display={this.state.display} />
        <Button
          value="1"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="2"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="3"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="Add (+)"
          className="button signButton"
          onClick={this.handleButtonClick}
        />
        <br />

        <Button
          value="4"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="5"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="6"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="Subtract (-)"
          className="button signButton"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="7"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="8"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="9"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="Multiply (X)"
          className="button signButton"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="Clear"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="0"
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value="="
          className="button"
          onClick={this.handleButtonClick}
        />
        <Button
          value={"Divide (\u00F7)"}
          className="button signButton"
          onClick={this.handleButtonClick}
        />
        <Button value="Scientific Mode"
          className="button signButton"
          onClick={this.handleScienceClick}
        />
        {this.state.isScientificEnabled ? 
          <ScientificButtons 
            buttonEnabled={this.state.isScientificEnabled} 
            handleButtonClick={this.handleButtonClick} /> 
          : null}
      </div>
    );
  }
}

export const ScientificButtons = ({ buttonEnabled, handleButtonClick }) => 
  buttonEnabled ? (
    <div>
      <Button
        value="+/-"
        className="button"
        onClick={handleButtonClick}
      />
      <Button
        value="Sq root"
        className="button"
        onClick={handleButtonClick}
      />
      <Button
        value="^"
        className="button"
        onClick={handleButtonClick}
      />
    </div>
  ) : null;

export default Calculator;
