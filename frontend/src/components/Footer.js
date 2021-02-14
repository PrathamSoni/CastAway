import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './Footer.scss';

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <p>
          Made with ❤️ at{' '}
          <a href="https://www.treehacks.com/" target="_blank" rel="noreferrer">
            TreeHacks
          </a>
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
