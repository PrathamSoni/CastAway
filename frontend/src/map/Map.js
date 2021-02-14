import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

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
  Button,
} from '@chakra-ui/react';

import './Map.scss';
import Marker from './Marker';

const Map = ({ changePage }) => {
  const [bottles, setBottles] = useState([]);
  const [zoom, setZoom] = useState(0);
  const [content, setContent] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/', {
      headers: header,
    }).then((res) => {
      setBottles(res.data.results);
    });
  }, []);

  const openModal = (id) => {
    console.log(id);
    Axios.get(`https://castaway-304704.uc.r.appspot.com/api/bottle/${id}`, {
      headers: header,
      params: {
        lat: localStorage.getItem('lat'),
        long: localStorage.getItem('lng'),
      },
    }).then((res) => {
      setContent(res.data.content);
      onOpen();
    });
  };

  let markers = bottles.map((element) => {
    return (
      <Marker
        id={element.id}
        open={openModal}
        lat={element.lat}
        lng={element.long}
        zoom={zoom}
      />
    );
  });

  const updateZoom = ({ center, zoom }) => {
    setZoom(zoom);
  };

  return (
    <Container fluid className="map-page page">
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={0}
          onChange={updateZoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{content}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Map;
