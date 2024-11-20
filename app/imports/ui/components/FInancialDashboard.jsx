import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Form, Card, Row, Col } from 'react-bootstrap';

const FinancialDashboard = ({
  budgetPnLData,
  auditedBalanceSheetData,
  availableYears,
  currentYear,
}) => {
  const [comparisonYear, setComparisonYear] = React.useState(null);
  const [displayType, setDisplayType] = React.useState('budgetPnL');

  const comparisonYearData = comparisonYear ? {
    budgetPnL: budgetPnLData.find(b => b.year === comparisonYear) || {},
    auditedBalanceSheet: auditedBalanceSheetData.find(a => a.year === comparisonYear) || {},
  } : null;

  const currentBudgetPnL = budgetPnLData[0] || {};
  const currentAuditedBalanceSheet = auditedBalanceSheetData[0] || {};

  const budgetPnLChartData = {
    labels: ['Revenues', 'Personnel', 'Program', 'Overhead', 'Net Income'],
    datasets: [
      {
        label: `Budget PnL ${currentYear}`,
        data: [
          currentBudgetPnL.revenues,
          currentBudgetPnL.personnel,
          currentBudgetPnL.program,
          currentBudgetPnL.overhead,
          currentBudgetPnL.revenues - (currentBudgetPnL.personnel + currentBudgetPnL.program + currentBudgetPnL.overhead),
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      ...(comparisonYearData ? [{
        label: `Budget PnL ${comparisonYear}`,
        data: [
          comparisonYearData.budgetPnL.revenues,
          comparisonYearData.budgetPnL.personnel,
          comparisonYearData.budgetPnL.program,
          comparisonYearData.budgetPnL.overhead,
          comparisonYearData.budgetPnL.revenues - (comparisonYearData.budgetPnL.personnel + comparisonYearData.budgetPnL.program + comparisonYearData.budgetPnL.overhead),
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }] : []),
    ],
  };

  const balanceSheetChartData = {
    labels: ['Cash', 'Investments', 'Liabilities', 'Net Assets'],
    datasets: [
      {
        label: `Audited Balance Sheet ${currentYear}`,
        data: [
          currentAuditedBalanceSheet.cash_total,
          currentAuditedBalanceSheet.investments_publicly_traded_securities,
          currentAuditedBalanceSheet.accounts_payable_and_accrued_expenses,
          currentAuditedBalanceSheet.total_net_assets_or_fund_balances,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      ...(comparisonYearData ? [{
        label: `Audited Balance Sheet ${comparisonYear}`,
        data: [
          comparisonYearData.auditedBalanceSheet.cash_total,
          comparisonYearData.auditedBalanceSheet.investments_publicly_traded_securities,
          comparisonYearData.auditedBalanceSheet.accounts_payable_and_accrued_expenses,
          comparisonYearData.auditedBalanceSheet.total_net_assets_or_fund_balances,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }] : []),
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Display:</Form.Label>
            <Form.Select
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value)}
            >
              <option value="budgetPnL">Budget PnL</option>
              <option value="auditedBalanceSheet">Audited Balance Sheet</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Compare with year:</Form.Label>
            <Form.Select
              value={comparisonYear || ''}
              onChange={(e) => setComparisonYear(e.target.value ? parseInt(e.target.value, 10) : null)}
            >
              <option value="">Select a year</option>
              {availableYears.slice(1).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>{displayType === 'budgetPnL' ? 'Budget PnL Summary' : 'Audited Balance Sheet Summary'}</Card.Header>
            <Card.Body style={{ height: '400px' }}>
              <Bar
                data={displayType === 'budgetPnL' ? budgetPnLChartData : balanceSheetChartData}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

FinancialDashboard.propTypes = {
  budgetPnLData: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number,
    revenues: PropTypes.number,
    personnel: PropTypes.number,
    program: PropTypes.number,
    overhead: PropTypes.number,
  })).isRequired,
  auditedBalanceSheetData: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number,
    cash_total: PropTypes.number,
    investments_publicly_traded_securities: PropTypes.number,
    accounts_payable_and_accrued_expenses: PropTypes.number,
    total_net_assets_or_fund_balances: PropTypes.number,
  })).isRequired,
  availableYears: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default FinancialDashboard;
