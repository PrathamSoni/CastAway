import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './Footer.scss';

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <p>Castaway</p>
      </Row>
    </Container>
  );
};

export default Footer;
