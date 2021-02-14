import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Sent.scss';

const Sent = () => {
  const [messages, setMessages] = useState([]);
  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/sent', {
      headers: header,
    }).then((res) => {
      setMessages(res.data.results);
    });
  }, []);

  return (
    <Container fluid className="sent-page page">
      <h1>Sent</h1>
    </Container>
  );
};

export default Sent;
