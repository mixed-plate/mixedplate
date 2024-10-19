import React from 'react';
import { Col, Container, Row, Card, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Landing = () => (
  <>
    <div className="fixed-bg" />
    <Container fluid className="content-wrapper py-3">
      <Row className="text-center">
        <Col>
          <h1
            className="display-4 mb-3"
            style={{ fontWeight: 700 }} // Bold title
          >
            Finance Forecasts
          </h1>
          {/* Navigation Buttons */}
          <div
            className="button-group"
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            <Nav.Link
              as={NavLink}
              to="/Budget"
              className="button get"
              style={{
                backgroundColor: '#4a4a4a',
                borderColor: '#4a4a4a',
                color: 'white',
                borderRadius: 0,
                fontSize: '14px',
                padding: '14px 28px',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Budget
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/form"
              className="button get"
              style={{
                backgroundColor: '#4a4a4a',
                borderColor: '#4a4a4a',
                color: 'white',
                borderRadius: 0,
                fontSize: '14px',
                padding: '14px 28px',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Audited
            </Nav.Link>
          </div>
        </Col>
      </Row>
    </Container>

    {/* Building a Brighter Tomorrow Section */}
    <Container fluid className="content" style={{ backgroundColor: 'white' }}>
      <Row className="align-items-center">
        <Col
          xs={12}
          md={4}
          style={{
            paddingLeft: 0,
            marginLeft: 0,
          }}
        >
          <Image
            src="./images/flowerBackground.jpg"
            alt="Background Flower"
            fluid
            style={{
              maxWidth: '100%',
              height: '75vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Col>
        <Col
          xs={12}
          md={8}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <h1
            className="display-5 mb-4 text-center"
            style={{
              fontSize: '3.25rem',
              fontWeight: 'bold',
            }}
          >Building a Brighter Tomorrow
          </h1>
          <p
            className="text-start"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            As a purpose-driven business consulting and CPA firm, Spire is proud
            of a heritage that began in Hawai‘i over six decades ago—a heritage
            that inspires the firm’s mission to help build a brighter future for
            the companies and communities it serves.
          </p>
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <Card.Title as="h3" style={{ fontWeight: 'bold' }}>
                Nimbleness is a Strategic Imperative in Today’s World
              </Card.Title>
              <Card.Text
                className="mb-4"
                style={{
                  fontSize: '1.1rem',
                }}
              >
                We’re an agile team of accounting, strategy, legal, financial
                forensics, and communications professionals. Our team brings
                experience from Fortune 500 companies, disruptive startups, and
                non-profits, ready to solve diverse challenges across sectors.
              </Card.Text>
              <Card.Subtitle
                as="h4"
                className="mb-2"
                style={{ fontWeight: 'bold' }}
              >
                Integrated Solutions with Context and Orientation
              </Card.Subtitle>
              <Card.Text
                style={{
                  fontSize: '1.1rem',
                }}
              >
                We embrace complexity, tackling interdependent challenges with
                thoughtful, integrated solutions. Rather than passing problems
                forward, we focus on meaningful, long-term resolutions.
              </Card.Text>
              <Card.Text
                style={{
                  fontSize: '1.1rem',
                }}
              >
                Responsible business practice means addressing economic, social,
                and environmental needs. We offer multi-dimensional solutions
                for a multi-dimensional world.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default Landing;
