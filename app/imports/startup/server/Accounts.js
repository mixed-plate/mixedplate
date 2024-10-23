import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  } else if (role === 'senior_manager') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'senior_manager');
  } else if (role === 'cfo') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'cfo');
  } else if (role === 'analyst') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'analyst');
  } else if (role === 'executive') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'executive');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish('allUsers', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }

  return Meteor.users.find({}, {
    fields: {
      username: 1,
      roles: 1,
    },
  });
});

// Publish all role assignments
Meteor.publish('userRoles', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }

  return Meteor.roleAssignment.find({});
});

// Ensure roles for the current user are always published
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
