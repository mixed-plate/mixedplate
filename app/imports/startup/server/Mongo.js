import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet.js';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL.js';
import { RefinancingScenarios } from '../../api/workpaper/4001.js';
/* eslint-disable no-console */

// Initialize the database with a default data document.
const addStuffData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addStuffData(data));
  }
}

// Add data to AuditedBalanceSheets collection
const addAuditedBalanceSheetData = (data) => {
  console.log(`  Adding Audited Balance Sheet for: ${data.year}`);
  AuditedBalanceSheets.collection.insert(data);
};

// Initialize the AuditedBalanceSheets collection if empty.
if (AuditedBalanceSheets.collection.find().count() === 0) {
  if (Meteor.settings.defaultAuditedBalanceSheets) {
    console.log('Creating default Audited Balance Sheets.');
    Meteor.settings.defaultAuditedBalanceSheets.forEach(data => addAuditedBalanceSheetData(data));
  } else {
    console.log('No default Audited Balance Sheets found. Please add some in your settings file.');
  }
}

// Add data to BudgetPnLs collection
const addBudgetPnLData = (data) => {
  console.log(`  Adding Budget P&L for: ${data.year}`);
  BudgetPnLs.collection.insert(data);
};

// Initialize the BudgetPnLs collection if empty.
if (BudgetPnLs.collection.find().count() === 0) {
  if (Meteor.settings.defaultBudgetPnLs) {
    console.log('Creating default Budget P&Ls.');
    Meteor.settings.defaultBudgetPnLs.forEach(data => addBudgetPnLData(data));
  } else {
    console.log('No default Budget P&Ls found. Please add some in your settings file.');
  }
}

// Add data to RefinancingScenarios collection
const addRefinancingScenarioData = (data) => {
  console.log(`  Adding Refinancing Scenario for: ${data.Description}`);
  RefinancingScenarios.collection.insert(data);
};

// Initialize the RefinancingScenarios collection if empty.
if (RefinancingScenarios.collection.find().count() === 0) {
  if (Meteor.settings.defaultRefinancingScenarios) {
    console.log('Creating default Refinancing Scenarios.');
    Meteor.settings.defaultRefinancingScenarios.forEach(data => addRefinancingScenarioData(data));
  } else {
    console.log('No default Refinancing Scenarios found. Please add some in your settings file.');
  }
}
