import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Dev from './img/dev.png';
import Prath from './img/prath.png';
import Samarth from './img/samarth.png';
import Naomi from './img/naomi.png';

import './About.scss';

const About = () => {
  return (
    <Container fluid className="about-page page">
      <Row className="body">
        <Col xs={7} className="left-col">
          <Row>
            <h2 className="heading">About CastAway</h2>
          </Row>
          <Row>
            <p>
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit its lit its lit
              its lit its lit its lit its lit its lit its lit
            </p>
          </Row>
        </Col>
        <Col xs={5} className="right-col">
          <Row>
            <h2 className="sub-heading">The Team</h2>
          </Row>
          <Row>
            <Col className="person-col">
              <img src={Dev} alt="Devrath Iyer" />
              <h3 className="names">Devrath Iyer</h3>
            </Col>
            <Col className="person-col">
              <img src={Samarth} alt="Samarth Goel" />
              <h3 className="names">Samarth Goel</h3>
            </Col>
          </Row>
          <Row>
            <Col className="person-col">
              <img src={Prath} alt="Prathman Soni" />
              <h3 className="names">Prathman Soni</h3>
            </Col>
            <Col className="person-col">
              <img src={Naomi} alt="Naomi Liu" />
              <h3 className="names">Naomi Liu</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
