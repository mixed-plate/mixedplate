import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet.js';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL.js';
import { RefinancingScenarios } from '../../api/workpaper/4001.js';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// Publish AuditedBalanceSheets collection to admin users
Meteor.publish('AdminPublishAuditedBalanceSheets', function () {
  if (this.userId) {
    const authorizedRoles = ['senior_manager', 'executive', 'cfo', 'admin', 'analyst'];
    if (Roles.userIsInRole(this.userId, authorizedRoles)) {
      return AuditedBalanceSheets.collection.find();
    }
  }
  return this.ready();
});

// Publish BudgetPnLs collection to admin users
Meteor.publish('AdminPublishBudgetPnLs', function () {
  if (this.userId) {
    // Check if user has appropriate role (senior_manager, executive, cfo, or admin)
    const authorizedRoles = ['senior_manager', 'executive', 'cfo', 'admin', 'analyst'];
    if (Roles.userIsInRole(this.userId, authorizedRoles)) {
      return BudgetPnLs.collection.find();
    }
  }
  return this.ready();
});

// Publish RefinancingScenarios collection to admin users
Meteor.publish('AdminPublishRefinancingScenarios', function () {
  if (this.userId) {
    const authorizedRoles = ['senior_manager', 'executive', 'cfo', 'admin', 'analyst'];
    if (Roles.userIsInRole(this.userId, authorizedRoles)) {
      return RefinancingScenarios.collection.find();
    }
  }
  return this.ready();
});
