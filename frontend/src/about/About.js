import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import images from './About.img/index.js';
import './About.scss';

const About = () => {
  return (
    <Container fluid className="about-page">
      <Row>
        <Col> <h1 className='heading'> About CastAway </h1> </Col>
        <Col> <h2 className='sub-heading'> The Team </h2> </Col>
      </Row>
      <Row>
        <Col>
          <p className="lit">
            its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit
          </p>
        </Col>
        <Col>
          <Row>
            <img src={images.d} alt='Devrath Iyer'/>
              <h3 className="names"> Devrath Iyer </h3>
            <img src={images.s} alt='Samarth Goel'/>
              <h3 className="names"> Samarth Goel </h3>
          </Row>
          <Row>
            <img src={images.p} alt='Prathman Soni'/>
              <h3 className="names"> Prathman Soni </h3>
            <img src={images.n} alt='Naomi Liu'/>
              <h3 className="names"> Naomi Liu </h3>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
