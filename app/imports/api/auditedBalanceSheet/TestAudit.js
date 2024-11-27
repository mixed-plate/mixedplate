import React, { useState } from 'react';
import { AuditedBalanceSheet } from './api/AuditBalanceSheet';

const CreateAuditPage = () => {
  const [year, setYear] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Year submitted: ${year}`); // Avoid using console.log in production
    // Handle submission logic here
  };

  return (
    <div>
      <h1>Create Audit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAuditPage;
