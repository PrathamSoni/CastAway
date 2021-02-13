import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Recieved.scss';

const Recieved = () => {
  const [messages,setMessages] = useState([]);

  //useEffect();
  return (
    <Container fluid className="recieved-page">
      <h1>Recieved</h1>
    </Container>
  );
};

export default Recieved;
