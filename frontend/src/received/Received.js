import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { parseDate } from '../Utils';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useDisclosure } from '@chakra-ui/react';

import bottle from './bottle.png';

import './Received.scss';

const Recieved = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/received', {
      headers: header,
    }).then((res) => {
      setMessages(res.data.results);
    });
  }, []);

  const openModal = (element) => {
    setMessage(element);
    console.log(element);
    onOpen();
  };

  const submitReply = (replyText) => {
    Axios.post('https://castaway-304704.uc.r.appspot.com/api/bottle/',
    {
      content: replyText,
      parent: message.id,
      lat: 0,
      long: 0,
      tta: 0,
      opened: false,
    }, {
      headers: header,
    }).then((res) => {
        message.can_reply = false;
    });
  };

  let display = messages.map((element) => {
    return (
      <Col xs={1}>
        <img
          src={bottle}
          onClick={() => openModal(element)}
          alt="message"
          style={{ cursor: 'pointer' }}
        />
      </Col>
    );
  });

  console.log(message);

  return (
    <Container fluid className="recieved-page page">
      <h1>Received</h1>
      <Row>{display}</Row>
      {message && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={`Message from ${parseDate(message.created)}`}
          body={message.content}
          reply={message.can_reply}
          submitReply={submitReply}
        />
      )}
    </Container>
  );
};

export default Recieved;
