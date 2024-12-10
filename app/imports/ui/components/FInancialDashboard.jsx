import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Form, Card } from 'react-bootstrap';

// register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinancialDashboard = ({ budgetPnLData, auditedBalanceSheetData }) => {
  const [displayType, setDisplayType] = React.useState('auditedBalanceSheet');

  // prepare data for charts
  const years = auditedBalanceSheetData.map(data => data.year);

  const auditedBalanceSheetChartData = {
    labels: years,
    datasets: [
      {
        label: 'Cash Total',
        data: auditedBalanceSheetData.map(data => data.cash_total),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: false,
      },
      {
        label: 'Investments',
        data: auditedBalanceSheetData.map(data => data.investments),
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: false,
      },
      {
        label: 'Net Fixed Assets',
        data: auditedBalanceSheetData.map(data => data.net_fixed_assets),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
      {
        label: 'Total Assets',
        data: auditedBalanceSheetData.map(data => data.total_assets_and_deferred_outflows_of_resources),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: false,
      },
    ],
  };

  const budgetPnLChartData = {
    labels: years,
    datasets: [
      {
        label: 'Revenues',
        data: budgetPnLData.map(data => data.revenues),
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(255,206,86,0.2)',
        fill: false,
      },
      {
        label: 'Personnel',
        data: budgetPnLData.map(data => data.personnel),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
      {
        label: 'Program',
        data: budgetPnLData.map(data => data.program),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: false,
      },
      {
        label: 'Overhead',
        data: budgetPnLData.map(data => data.overhead),
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
        fill: false,
      },
    ],
  };

  return (
    <Card>
      <Card.Header>
        <Form.Select value={displayType} onChange={(e) => setDisplayType(e.target.value)}>
          <option value="auditedBalanceSheet">Audited Balance Sheet</option>
          <option value="budgetPnL">Budget PnL</option>
        </Form.Select>
      </Card.Header>
      <Card.Body>
        {displayType === 'auditedBalanceSheet' ? (
          <Line data={auditedBalanceSheetChartData} />
        ) : (
          <Line data={budgetPnLChartData} />
        )}
      </Card.Body>
    </Card>
  );
};

FinancialDashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  budgetPnLData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  auditedBalanceSheetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FinancialDashboard;
