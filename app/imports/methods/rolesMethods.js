import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

Meteor.methods({
  'roles.setUserRole'(userId, role) {
    check(userId, String);
    check(role, String);

    // Make sure the user is logged in and is an admin
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to assign roles.');
    }

    // Create the role if it doesn't exist
    Roles.createRole(role, { unlessExists: true });

    // Remove any existing roles and set the new one
    const currentRoles = Roles.getRolesForUser(userId);
    currentRoles.forEach(currentRole => {
      Roles.removeUsersFromRoles(userId, currentRole);
    });

    // Assign the new role
    Roles.addUsersToRoles(userId, role);
  },

  'roles.removeUserRole'(userId, role) {
    check(userId, String);
    check(role, String);

    // Make sure the user is logged in and is an admin
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to remove roles.');
    }

    // Remove the role
    Roles.removeUsersFromRoles(userId, role);
  },
});
