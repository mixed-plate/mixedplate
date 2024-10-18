import React from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';

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
          <Button
            size="lg"
            className="button get"
            style={{
              backgroundColor: '#4a4a4a',
              borderColor: '#4a4a4a',
              color: 'white',
              borderRadius: 0,
              fontSize: '14px',
              marginLeft: '-20px',
              marginTop: '5px',
            }}
          >
            Get Started
          </Button>
        </Col>
      </Row>
    </Container>
    {/* Building a Brighter Tomorrow Section */}
    <Container fluid className="content" style={{ backgroundColor: 'white' }}>
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-5">Building a Brighter Tomorrow</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <p className="text-start">
            As a purpose-driven business consulting and CPA firm,
            Spire is proud of a heritage that began in Hawai‘i over
            six decades ago—a heritage that inspires the firm’s
            mission to help build a brighter future for the companies
            and communities it serves.
          </p>
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <Card.Title as="h3">
                Nimbleness is a Strategic Imperative in Today’s World
              </Card.Title>
              <Card.Text className="mb-4">
                We’re an agile team of accounting, strategy, legal,
                financial forensics, and communications professionals.
                Our team brings experience from Fortune 500 companies,
                disruptive startups, and non-profits, ready to solve
                diverse challenges across sectors.
              </Card.Text>
              <Card.Subtitle as="h4" className="mb-2">
                Integrated Solutions with Context and Orientation
              </Card.Subtitle>
              <Card.Text>
                We embrace complexity, tackling interdependent challenges
                with thoughtful, integrated solutions. Rather than passing
                problems forward, we focus on meaningful, long-term resolutions.
              </Card.Text>
              <Card.Text>
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
