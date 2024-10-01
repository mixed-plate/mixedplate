import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet.js';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL.js';
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
  console.log(`  Adding Audited Balance Sheet for: ${data}`);
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
  console.log(`  Adding Budget P&L for: ${data}`);
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

// Publish AuditedBalanceSheets collection to admin users
Meteor.publish('AdminPublishAuditedBalanceSheets', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return AuditedBalanceSheets.collection.find();
  }
  return this.ready();
});

// Publish BudgetPnLs collection to admin users
Meteor.publish('AdminPublishBudgetPnLs', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return BudgetPnLs.collection.find();
  }
  return this.ready();
});
