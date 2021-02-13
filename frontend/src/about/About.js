import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './About.scss';

const About = () => {
  return (
    <Container fluid className="about-page">
      <Row>
        <Col> <h1 className='company-name'>CastAway</h1> </Col>
      </Row>
      <Row>
        <Col> <h2 className='sub-heading'> About CastAway </h2> </Col>
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
            <h3 className="names"> Devarth Iyer </h3>
            <h3 className="names"> Samarth Goel </h3>
          </Row>
          <Row>
            <h3 className="names"> Prathman Soni </h3>
            <h3 className="names"> Naomi Liu </h3>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
