import React from 'react';
import { CardTitle, Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer
    className="footer bg-dark text-light"
    style={{ marginTop: '200px', padding: '20px 0' }}
  >
    <Container>
      <hr />
      <Container>
        <Row>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/firm/our-firm">OUR FIRM</CardTitle>
            <li>
              <a href="https://www.spirehawaii.com/firm/our-philosophy">Our Philosophy</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/firm/our-roots">Our Roots</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/firm/our-team">Our Team</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/firm/our-community">Our Community</a>
            </li>
            <li>
              <a href="https://www.spirenewyork.com/">Spire New York</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/careers">Careers</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/our-work">OUR WORK</CardTitle>
            <li>
              <a href="https://www.spirehawaii.com/case-study-tags/government">Government</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/case-study-tags/private-industry">Private Industry</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/our-services">OUR SERVICES</CardTitle>
            <li>
              <a href="https://www.spirehawaii.com/business-services/assurance-services">Assurance</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/business-services/legal-support">Legal Support</a>
            </li>
          </Col>
        </Row>
      </Container>
      <hr />
      <Row>
        <Col className="text-center">
          Mixed Plate Team Members
          <br />
          Kaylee, Xiaokang, Darrius, Natalie
          <br />
          Zeb, Jaira, Carolina
          <br />
          <a href="https://mixed-plate.github.io/" style={{ color: '#fff', textDecorationLine: 'underline' }}>
            Team Page
          </a>
        </Col>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii at Manoa
          <br />
          Honolulu, HI 96822
          <br />
          <a
            href="http://ics-software-engineering.github.io/meteor-application-template-react"
            style={{ color: '#fff', textDecorationLine: 'underline' }}
          >
            Template Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
