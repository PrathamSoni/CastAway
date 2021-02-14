import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Dev from './img/dev.png';
import Prath from './img/prath.png';
import Samarth from './img/samarth.png';
import Naomi from './img/naomi.png';

import Logo from '../logo.png';

import './About.scss';

const About = () => {
  return (
    <Container fluid className="about-page page">
      <Row className="logo">
        <img src={Logo} alt="" />
      </Row>
      <Row>
        <Col xs={7} className="about-left-col">
          <Row>
            <h2>About Us</h2>
            <p>
              CastAway is a new-age post-modernist inspired social networking
              phenomona transforming the multi-trillion dollar
              consumer-generative content and communication market. Built by
              users for users, CastAway's team consists of the brightest minds
              in emerging communications technology and the cutting edge of
              neuroscience from Stanford University and UC Berkeley.
            </p>
          </Row>
        </Col>
        <Col xs={5} className="about-right-col">
          <Row>
            <h2>The Team</h2>
          </Row>
          <Row>
            <Col className="person-col">
              <img src={Dev} alt="Devrath Iyer" />
              <h3>Devrath Iyer</h3>
            </Col>
            <Col className="person-col">
              <img src={Samarth} alt="Samarth Goel" />
              <h3>Samarth Goel</h3>
            </Col>
          </Row>
          <Row>
            <Col className="person-col">
              <img src={Prath} alt="Prathman Soni" />
              <h3>Prathman Soni</h3>
            </Col>
            <Col className="person-col">
              <img src={Naomi} alt="Naomi Liu" />
              <h3>Naomi Liu</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
