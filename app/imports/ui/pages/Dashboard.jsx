import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';
import FinancialDashboard from '../components/FInancialDashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { ready, budgetPnLData, auditedBalanceSheetData, availableYears } = useTracker(() => {
    const budgetSub = Meteor.subscribe('AdminPublishBudgetPnLs');
    const balanceSheetSub = Meteor.subscribe('AdminPublishAuditedBalanceSheets');

    return {
      ready: budgetSub.ready() && balanceSheetSub.ready(),
      budgetPnLData: BudgetPnLs.collection.find({}, { sort: { year: -1 } }).fetch(),
      auditedBalanceSheetData: AuditedBalanceSheets.collection.find({}, { sort: { year: -1 } }).fetch(),
      availableYears: [...new Set([
        ...BudgetPnLs.collection.find().fetch().map(b => b.year),
        ...AuditedBalanceSheets.collection.find().fetch().map(a => a.year)
      ])].sort((a, b) => b - a),
    };
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <Container className="py-3">
      <h1 className="text-center mb-4">Financial Dashboard</h1>
      <FinancialDashboard
        budgetPnLData={budgetPnLData}
        auditedBalanceSheetData={auditedBalanceSheetData}
        availableYears={availableYears}
        currentYear={availableYears[0]}
      />
    </Container>
  );
};

export default Dashboard;
