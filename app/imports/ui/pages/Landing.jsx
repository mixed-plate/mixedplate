import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

const Landing = () => (
  <>
    <div
      className="fixed-bg"
    />
    <Container id="landing-page" fluid className="content d-flex justify-content-center align-items-center">
      <Row className="text-center">
        <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
          <h1>Spire</h1>
          <p>
            Spire offers a comprehensive financial platform, giving clients the tools they need to securely input and
            analyze their financial data.
          </p>
          <div className="mt-4">
            <Button variant="primary" className="me-2">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </Col>
      </Row>
    </Container>

    {/* Additional content sections can be added here */}
  </>
);

export default Landing;
