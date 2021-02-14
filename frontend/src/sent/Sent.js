import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

import './Sent.scss';

import bottle from "./bottle.png";

const Sent = () => {
  const [messages, setMessages] = useState([]);
  const [message,setMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/sent', {
      headers: header,
    }).then((res) => {
      setMessages(res.data.results);
    });
  }, []);

  let display = messages.map(element => {
    return (
    <Col>
      <img src={bottle} onClick={() => openModal(element)}></img>
    </Col>);
  });

  const openModal = (element) => {
    setMessage(element);
    console.log(element);
    onOpen();
  }

  return (
    <Container fluid className="sent-page page">
      <h1>Sent</h1>
      <Row>{display}</Row>
      {(message) ? <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            "{message.content}"

            <p>({message.opened ? "Opened at ":"Currently at "}) {`${(message.lat).toFixed(4)},${(message.long).toFixed(4)}`})</p>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>:(null)}
    </Container>
  );
};

export default Sent;
