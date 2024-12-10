import React from 'react';
import { CardTitle, Col, Container, Row } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';

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
            <li>
              <a href="https://www.spirehawaii.com/business-services/accounting-services">Accounting</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/business-services/change-management">Change Management</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/business-services/consulting">Consulting</a>
            </li>
            <li>
              <a href="https://www.spirehawaii.com/business-services/it-consulting">IT Consulting</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/contact">CONTACT US</CardTitle>
            <li>
              <a href="https://www.google.com/maps/place/Spire+Hawaii+LLP/@21.3075007,-157.8657031,17z/data=!3m1!4b1!4m5!3m4!1s0x7c006e7452ec94e5:0xc63392723c5bb7c0!8m2!3d21.3074957!4d-157.8635144">700 Bishop Street,
                Suite 2001
                Honolulu,
                Hawaii
                96813
              </a>
            </li>
            <li>
              <a href="tel:+8085360066">(808) 536-0066</a>
            </li>
            <li>
              <a href="contactus@spirehi.com">contactus@spirehi.com</a>
            </li>
          </Col>
          <Col>
            <CardTitle>FOLLOW ALONG</CardTitle>
            <div>
              <Linkedin className="" />
            </div>
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
