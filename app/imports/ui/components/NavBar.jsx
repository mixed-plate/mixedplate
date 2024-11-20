import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser, userRoles } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    userRoles: Meteor.userId() ? Roles.getRolesForUser(Meteor.userId()) : [],
  }), []);

  const isAdmin = userRoles.includes('admin');
  const isManagerOrAbove = userRoles.some(role => ['senior_manager', 'executive', 'cfo'].includes(role));
  const isCFO = userRoles.includes('cfo');
  const canViewDashboard = userRoles.some(role => ['analyst', 'senior_manager', 'executive', 'cfo', 'admin'].includes(role));

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/spire-logo.png"
                alt="Logo"
                style={{
                  height: '70px',
                  marginRight: '30px',
                  marginLeft: '-10px',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
              />
            </div>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link id="about-us-nav" as={NavLink} to="/aboutus">
                  About Us
                </Nav.Link>
                {canViewDashboard && (
                  <Nav.Link id="dashboard-nav" as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                )}
                {isManagerOrAbove && (
                  <>
                    <Nav.Link id="audited-nav" as={NavLink} to="/Form">
                      Audited
                    </Nav.Link>
                    <Nav.Link id="budget-nav" as={NavLink} to="/Budget">
                      Budget
                    </Nav.Link>
                  </>
                )}
                {isAdmin && (
                  <Nav.Link id="admin-nav" as={NavLink} to="/admin">
                    Admin
                  </Nav.Link>
                )}
                {isCFO && (
                  <Nav.Link id="4001-nav" as={NavLink} to="/4001">
                      4001
                  </Nav.Link>
                )}
                {/* Updated Upload CSV Link */}
                <Nav.Link id="upload-csv-nav" as={NavLink} to="/upload">
                  Upload CSV
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
