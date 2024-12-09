import React, { useState } from 'react';

const CreateAuditPage = () => {
  const [year, setYear] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!year) {
      alert('Please enter a valid year.');
      return;
    }
    console.debug(`Year submitted: ${year}`); // Use console.debug for debugging
    // Handle submission logic here
  };

  return (
    <div>
      <h1>Create Audit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
