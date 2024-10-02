import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-3 bg-dark text-light">
    <Container>
      <Row>
        <Col className="text-center">
          Mixed Plate Team Members
          <br />
          Kaylee, Xiaokang, Darrius, Natalie
          <br />
          Zeb, Jaira, Ryne, Carolina
          <br />
          <a href="https://mixed-plate.github.io/">Team Page</a>
        </Col>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii at Manoa
          <br />
          Honolulu, HI 96822
          <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
            Template Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
