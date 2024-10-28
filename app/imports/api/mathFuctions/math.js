import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  // Function to handle button click
  const handleClick = (value) => {
    setInput(input + value);
  };
  // Function to clear the input and result
  const handleClear = () => {
    setInput('');
    setResult('');
  };
  // Function to calculate the result
  const handleEqual = () => {
    try {
      const evaluatedResult = eval(input); // Calculate the expression
      setResult(evaluatedResult.toString()); // Display result
    } catch (error) {
      setResult('Error');
    }
  };
  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <div className="display">
        <div className="input">{input || '0'}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {/* First Row */}
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        {/* Second Row */}
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        {/* Third Row */}
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        {/* Fourth Row */}
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('/')}>/</button>
        {/* Equal Button */}
        <button className="equal" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};
export default Calculator;
