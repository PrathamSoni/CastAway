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


import './Recieved.scss';

import bottle from "./bottle.png";

const Recieved = () => {
  const [messages, setMessages] = useState([]);
  const [message,setMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure()
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
  }

  let display = messages.map(element => {
    return (
    <Col>
      <img src={bottle} onClick={() => openModal(element)}></img>
    </Col>);
  });

  return (
    <Container fluid className="recieved-page page">
      <h1>Recieved</h1>
      <Row>{display}</Row>
      {(message) ? <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message.content}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {(message.can_reply) ? <Button variant="ghost">Reply</Button>: (null)}
          </ModalFooter>
        </ModalContent>
      </Modal>:(null)}
      
    </Container>
  );
};

export default Recieved;
