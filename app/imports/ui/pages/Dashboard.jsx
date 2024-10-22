import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [comparisonYear, setComparisonYear] = useState(null);
  const [displayType, setDisplayType] = useState('budgetPnL');

  const { ready, budgetPnLData, auditedBalanceSheetData, availableYears } = useTracker(() => {
    const budgetSub = Meteor.subscribe('AdminPublishBudgetPnLs');
    const balanceSheetSub = Meteor.subscribe('AdminPublishAuditedBalanceSheets');

    const isReady = budgetSub.ready() && balanceSheetSub.ready();

    const budgetPnLs = BudgetPnLs.collection.find({}, { sort: { year: -1 } }).fetch();
    const auditedBalanceSheets = AuditedBalanceSheets.collection.find({}, { sort: { year: -1 } }).fetch();

    const years = [...new Set([...budgetPnLs.map(b => b.year), ...auditedBalanceSheets.map(a => a.year)])].sort((a, b) => b - a);

    return {
      ready: isReady,
      budgetPnLData: budgetPnLs,
      auditedBalanceSheetData: auditedBalanceSheets,
      availableYears: years,
    };
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  const currentYear = availableYears[0];
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
          comparisonYearData.auditedBalanceSheet.cash,
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
    <Container className="py-3">
      <h1 className="text-center mb-4">Financial Dashboard</h1>
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
    </Container>
  );
};

export default Dashboard;
