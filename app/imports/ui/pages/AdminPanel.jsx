import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Button, Form } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPanel = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const { users, ready } = useTracker(() => {
    // Subscribe to users and roles
    const usersSub = Meteor.subscribe('allUsers');
    const rolesSub = Meteor.subscribe('userRoles');

    const rdy = usersSub.ready() && rolesSub.ready();

    const userList = Meteor.users.find({}).fetch().map(user => ({
      _id: user._id,
      username: user.username,
      // Get roles directly using Roles.getRolesForUser
      roles: Roles.getRolesForUser(user._id),
    }));

    return {
      users: userList,
      ready: rdy,
    };
  }, []);

  const availableRoles = ['admin', 'senior_manager', 'cfo', 'analyst', 'executive'];

  const handleRoleAssignment = (e) => {
    e.preventDefault();
    if (selectedUser && selectedRole) {
      Meteor.call('roles.setUserRole', selectedUser, selectedRole, (error) => {
        if (error) {
          console.error('Error assigning role:', error);
          alert(`Error assigning role: ${error.message}`);
        } else {
          alert('Role assigned successfully!');
          setSelectedRole('');
          setSelectedUser('');
        }
      });
    }
  };

  const removeRole = (userId, role) => {
    if (window.confirm(`Are you sure you want to remove the ${role} role from this user?`)) {
      Meteor.call('roles.removeUserRole', userId, role, (error) => {
        if (error) {
          console.error('Error removing role:', error);
          alert(`Error removing role: ${error.message}`);
        }
      });
    }
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={10}>
          <Col className="text-center mb-4">
            <h2>Admin Panel</h2>
          </Col>

          <section className="mb-4">
            <h4>Assign Role</h4>
            <Form onSubmit={handleRoleAssignment}>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Select User</Form.Label>
                    <Form.Select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      required
                    >
                      <option value="">Choose a user...</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Select Role</Form.Label>
                    <Form.Select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      required
                    >
                      <option value="">Choose a role...</option>
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role.replace('_', ' ').toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button type="submit" className="mb-3">
                    Assign Role
                  </Button>
                </Col>
              </Row>
            </Form>
          </section>

          <section>
            <h4>User Roles</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Current Roles</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>
                      {user.roles && user.roles.length > 0
                        ? user.roles.map(role => (
                          <span
                            key={`${user._id}-${role}`}
                            className="badge bg-primary me-1"
                            style={{ padding: '0.5em 1em' }}
                          >
                            {role}
                          </span>
                        ))
                        : <em>No roles assigned</em>}
                    </td>
                    <td>
                      {user.roles && user.roles.map(role => (
                        <Button
                          key={`remove-${user._id}-${role}`}
                          variant="danger"
                          size="sm"
                          className="me-1 mb-1"
                          onClick={() => removeRole(user._id, role)}
                        >
                          Remove {role}
                        </Button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminPanel;
