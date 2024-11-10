import React, { useState } from 'react';
import './App.css';

const FinancialCalculator = () => {
  // States for inputs
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [workingCapitalChange, setWorkingCapitalChange] = useState('');

  // States for results
  const [netIncome, setNetIncome] = useState('');
  const [cashFlow, setCashFlow] = useState('');

  // Function to calculate Net Income
  const calculateNetIncome = () => {
    try {
      const result = parseFloat(revenue) - parseFloat(expenses);
      setNetIncome(result.toFixed(2));
    } catch (error) {
      setNetIncome('Error');
    }
  };

  // Function to calculate Cash Flow from Operations
  const calculateCashFlow = () => {
    try {
      const result = parseFloat(netIncome) + parseFloat(depreciation) - parseFloat(workingCapitalChange);
      setCashFlow(result.toFixed(2));
    } catch (error) {
      setCashFlow('Error');
    }
  };

  // Function to clear all inputs and results
  const handleClear = () => {
    setRevenue('');
    setExpenses('');
    setDepreciation('');
    setWorkingCapitalChange('');
    setNetIncome('');
    setCashFlow('');
  };

  return (
    <div className="financial-calculator">
      <h1>Financial Calculator</h1>

      <div className="input-section">
        <label htmlFor="revenue">
          Revenue:
          <input
            id="revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </label>

        <label htmlFor="expenses">
          Expenses:
          <input
            id="expenses"
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </label>

        <label htmlFor="depreciation">
          Depreciation:
          <input
            id="depreciation"
            type="number"
            value={depreciation}
            onChange={(e) => setDepreciation(e.target.value)}
          />
        </label>

        <label htmlFor="workingCapitalChange">
          Working Capital Change:
          <input
            id="workingCapitalChange"
            type="number"
            value={workingCapitalChange}
            onChange={(e) => setWorkingCapitalChange(e.target.value)}
          />
        </label>
      </div>

      <div className="button-section">
        <button type="button" onClick={calculateNetIncome}>Calculate Net Income</button>
        <button type="button" onClick={calculateCashFlow}>Calculate Cash Flow</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </div>

      <div className="result-section">
        <div>Net Income: {netIncome || '0'}</div>
        <div>Cash Flow: {cashFlow || '0'}</div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
