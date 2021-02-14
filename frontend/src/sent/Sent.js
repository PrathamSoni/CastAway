import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useDisclosure } from '@chakra-ui/react';

import './Sent.scss';

import bottle from './bottle.png';

const Sent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/sent/', {
      headers: header,
    }).then((res) => {
      setMessages(res.data.results);
    });
  }, []);

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

  const openModal = (element) => {
    setMessage(element);
    console.log(element);
    onOpen();
  };

  return (
    <Container fluid className="sent-page page">
      <h1>Sent</h1>
      <Row>{display}</Row>
      {message && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={'Message'}
          body={
            <>
              "{message.content}"
              <p>
                {message.opened ? 'Opened at ' : 'Currently at '}{' '}
                {`(${Math.round(message.lat * 100) / 100}, ${Math.round(message.long * 100) / 100})`}
              </p>
              {message.amount > 0.001 && (
              <p>Amount: {message.amount}, Status: {message.status ? "Delivered":"Pending"}</p>
              )}
            </>
          }
        />
      )}
    </Container>
  );
};

export default Sent;
