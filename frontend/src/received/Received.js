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
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/received/', {
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

  const openBottle = (element) => {
    Axios.get(`https://castaway-304704.uc.r.appspot.com/api/bottle/${element.id}/`, {
      headers: header,
      params: {
        lat: localStorage.getItem('lat'),
        long: localStorage.getItem('lng'),
      }
    }).then((res) => {
      element.status = res.data.status;
      element.opened = true;
      openModal(element);
    });
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
          onClick={() => openBottle(element)}
          alt="message"
          className="received-bottle"
          style={{ cursor: 'pointer' }}
        />
        {!element.opened && <span className="new-badge"></span>}
      </Col>
    );
  });

  return (
    <Container fluid className="received-page page">
      <h1>Received</h1>
      <Row>{display}</Row>
      {message && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={`Message from ${parseDate(message.created)}`}
          body={
            <>
              "{message.content}"
              {message.amount > 0.001 && (
              <p>Amount: {message.amount}, Status: {message.status ? "Delivered":"Pending"}</p>
              )}
            </>
          }
          reply={message.can_reply}
          submitReply={submitReply}
          amount={message.amount}
          status={message.status}
        />
      )}
    </Container>
  );
};

export default Recieved;
