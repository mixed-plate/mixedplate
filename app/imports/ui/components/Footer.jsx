import React from 'react';
import { CardTitle, Col, Container, Row } from 'react-bootstrap';
import { Linkedin, Instagram, Twitter } from 'react-bootstrap-icons';

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
            <CardTitle href="https://www.spirehawaii.com/firm/our-firm" style={{ padding: '0 0 20px 0' }}>OUR FIRM</CardTitle>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/firm/our-philosophy">Our Philosophy</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/firm/our-roots">Our Roots</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/firm/our-team">Our Team</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/firm/our-community">Our Community</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirenewyork.com/">Spire New York</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/careers">Careers</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/our-work" style={{ padding: '0 0 20px 0' }}>OUR WORK</CardTitle>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/case-study-tags/government">Government</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/case-study-tags/private-industry">Private Industry</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/our-services" style={{ padding: '0 0 20px 0' }}>OUR SERVICES</CardTitle>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/assurance-services">Assurance</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/legal-support">Legal Support</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/accounting-services">Accounting</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/change-management">Change Management</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/consulting">Consulting</a>
            </li>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.spirehawaii.com/business-services/it-consulting">IT Consulting</a>
            </li>
          </Col>
          <Col>
            <CardTitle href="https://www.spirehawaii.com/contact" style={{ padding: '0 0 20px 0' }}>CONTACT US</CardTitle>
            <li style={{ padding: '0 0 10px 0' }}>
              <a href="https://www.google.com/maps/place/Spire+Hawaii+LLP/@21.3075007,-157.8657031,17z/data=!3m1!4b1!4m5!3m4!1s0x7c006e7452ec94e5:0xc63392723c5bb7c0!8m2!3d21.3074957!4d-157.8635144">
                700 Bishop Street,
                <br />
                Suite 2001
                <br />
                Honolulu,
                Hawaii
                <br />
                96813
              </a>
            </li>
            <li style={{ padding: '20px 0 0 0' }}>
              <a href="tel:+8085360066">(808) 536-0066</a>
            </li>
            <li>
              <a href="contactus@spirehi.com">contactus@spirehi.com</a>
            </li>
          </Col>
          <Col>
            <CardTitle style={{ padding: '0 0 20px 0' }}>FOLLOW ALONG</CardTitle>
            <li>
              <a href="www.linkedin.com/company/spire-hawaii-llp/" style={{ color: '#fff' }}>
                <Linkedin size="25" style={{ margin: '10px' }} />
              </a>
            </li>
            <li>
              <a href="http://instagram.com/spirehawaii" style={{ color: '#fff' }}>
                <Instagram size="25" style={{ margin: '10px' }} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/spirehawaii" style={{ color: '#fff' }}>
                <Twitter size="25" style={{ margin: '10px' }} />
              </a>
            </li>
          </Col>
          <Col>
            <li style={{ padding: '0px 0px 30px' }}>
              <a href="https://www.spirehawaii.com/" aria-label="spire">
                <img alt="" src="/images/spire-logo.png" width={200} style={{ filter: 'drop-shadow(5px 5px 10px rgba(100,100,100,0.5))' }} />
              </a>
            </li>
            <li style={{ padding: '0px 0px 30px' }}>
              <a href="https://www.aicpa-cima.com/home" aria-label="aicpa">
                <img alt="" src="https://cdn.prod.website-files.com/5fdaca5a4d51110c2f760a05/5fdbba708f0a882a29c11602_AICPA-logo.png" width={200} style={{ filter: 'drop-shadow(5px 5px 10px rgba(100,100,100,5))' }} />
              </a>
            </li>
            <li style={{ padding: '0px 0px 30px' }}>
              <a href="http://www.allinialglobal.com/" aria-label="allinial">
                <img alt="" src="https://dembojones.com/wp-content/uploads/2020/08/allinial_global_member_color.png" width={200} style={{ filter: 'drop-shadow(5px 5px 10px rgba(100,100,100,0.5))' }} />
              </a>
            </li>
          </Col>
        </Row>
      </Container>
      <hr />
      <Row>
        <Col className="text-center">
          <h5 style={{ padding: '0 0 10px' }}>Mixed Plate Team Members</h5>
          Kaylee, Xiaokang, Darrius, Natalie
          <br />
          Zeb, Jaira, Carolina
          <br />
          <a href="https://mixed-plate.github.io/" style={{ color: '#fff', textDecorationLine: 'underline' }}>
            Team Page
          </a>
        </Col>
        <Col className="text-center">
          <h5 style={{ padding: '0 0 10px' }}>Department of Information and Computer Sciences</h5>
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
