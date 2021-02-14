import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Dev from './img/dev.png';
import Prath from './img/prath.png';
import Samarth from './img/samarth.png';
import Naomi from './img/naomi.png';

import Logo from '../logo.png';
import Linkedin from './img/linkedin.png';
import Github from './img/github.png';

import './About.scss';

const About = () => {
  const data = [
    {
      photo: Dev,
      name: 'Devrath Iyer',
      linkedin: 'https://www.linkedin.com/in/devrathiyer/',
      github: '',
    },
    {
      photo: Samarth,
      name: 'Samarth Goel',
      linkedin: 'https://www.linkedin.com/in/samarth-goel-1047b8187/',
      github: '',
    },
    {
      photo: Prath,
      name: 'Pratham Soni',
      linkedin: 'https://www.linkedin.com/in/pratham-soni2002/',
      github: '',
    },
    {
      photo: Naomi,
      name: 'Naomi Liu',
      linkedin: 'https://www.linkedin.com/in/samarth-goel-1047b8187/',
      github: '',
    },
  ];

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
            {data.slice(0, 2).map(({ photo, name, linkedin, github }) => (
              <Col className="person-col">
                <div className="photos">
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    <img
                      src={Linkedin}
                      alt="Linkedin"
                      className="icon linkedin"
                    />
                  </a>
                  <img src={photo} alt={name} />
                  <a href={github} target="_blank" rel="noreferrer">
                    <img src={Github} alt="Github" className="icon github" />
                  </a>
                </div>
                <h3>{name}</h3>
              </Col>
            ))}
          </Row>
          <Row>
            {data.slice(2, 4).map(({ photo, name, linkedin, github }) => (
              <Col className="person-col">
                <div className="photos">
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    <img
                      src={Linkedin}
                      alt="Linkedin"
                      className="icon linkedin"
                    />
                  </a>
                  <img src={photo} alt={name} />
                  <a href={github} target="_blank" rel="noreferrer">
                    <img src={Github} alt="Github" className="icon github" />
                  </a>
                </div>
                <h3>{name}</h3>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
