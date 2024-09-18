import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const AboutUs = () => (
  <Container id="landing-page" fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '5vh' }}>
    <Row className="text-center">
      <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
        <h1>Spire</h1>
        <p>
          About Us information
        </p>
      </Col>
    </Row>
  </Container>
);

export default AboutUs;
