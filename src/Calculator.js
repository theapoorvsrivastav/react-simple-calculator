import React from 'react';
import Engine from './Engine.js';
import Display from './Display.js';
import Button from './Button.js';
import './Calculator.scss';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      engine: new Engine(),
      isScientificEnabled: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleScienceClick = this.handleScienceClick.bind(this);
    this.handleLightMode = this.handleLightMode.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
    this.calculatorDom = React.createRef();
    this.lightNode = React.createRef();
    this.darkNode = React.createRef();
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

  handleLightMode(){
    let lightNode = this.lightNode.current;
    let darkNode = this.darkNode.current;
    let calcNode = this.calculatorDom.current;
    darkNode.className= "";
    lightNode.className="currentToggle";
    calcNode.offsetParent.className="lightBg";
    calcNode.className = "lightMode";
  }
  handleDarkMode(){
    let lightNode = this.lightNode.current;
    let darkNode = this.darkNode.current;
    let calcNode = this.calculatorDom.current;
    lightNode.className = "";
    calcNode.offsetParent.className="darkBg";
    darkNode.className = "currentToggle";
    calcNode.className = "darkMode";
  }

  render() {
    return (
      <div ref={this.calculatorDom}>
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
          className="button customButton"
          onClick={this.handleScienceClick}
        />
        {this.state.isScientificEnabled ? 
          <ScientificButtons 
            buttonEnabled={this.state.isScientificEnabled} 
            handleButtonClick={this.handleButtonClick} /> 
          : null}
          <div className="colorToggle">
            <button ref={this.lightNode} className="currentToggle" onClick={this.handleLightMode}>Light Mode</button>
            <button ref={this.darkNode} onClick={this.handleDarkMode}>Dark Mode</button>
        </div>
      </div>
      
    );
  }
}

export const ScientificButtons = ({ buttonEnabled, handleButtonClick }) => 
  buttonEnabled ? (
    <div>
      <Button
        value="+/-"
        className="button sciButton"
        onClick={handleButtonClick}
      />
      <Button
        value="Sq root"
        className="button sciButton"
        onClick={handleButtonClick}
      />
      <Button
        value="^"
        className="button sciButton"
        onClick={handleButtonClick}
      />
    </div>
  ) : null;

export default Calculator;
