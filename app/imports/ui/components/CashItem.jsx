import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CashItem = ({ cash }) => {
  const total = (cash.petty_cash || 0) + (cash.cash || 0) + (cash.cash_in_banks_draw_on_line_credit || 0);

return (
    <tr>
      <td>{cash.year}</td>
      <td>{cash.petty_cash}</td>
      <td>{cash.cash}</td>
      <td>{cash.cash_in_banks_draw_on_line_credit}</td>
      <td>{total}</td> {/* Display the total */}
    </tr> );
};
// Require a document to be passed to this component.
CashItem.propTypes = {
  cash: PropTypes.shape({
    petty_cash: PropTypes.number,
    cash: PropTypes.number,
    cash_in_banks_draw_on_line_credit: PropTypes.number,
    year: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  }

export default CashItem;
