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
        <Col> <h2> About CastAway </h2> </Col>
        <Col> <h2> The Team </h2> </Col>
      </Row>
      <Row>
        <Col>
          <p className="lit">
            its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit its lit
          </p>
        </Col>
        <Col>
          <Row> </Row>
          <Row> </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
