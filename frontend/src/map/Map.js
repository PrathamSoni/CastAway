import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Map.scss';
import Marker from './Marker';

const Map = ({ changePage }) => {
  const [bottles, setBottles] = useState([]);
  const [zoom, setZoom] = useState(0);
  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    Axios.get('https://castaway-304704.uc.r.appspot.com/api/bottle/', {
      headers: header,
    }).then((res) => {
      setBottles(res.data.results);
    });
  }, []);

  let markers = bottles.map((element) => {
    return <Marker lat={element.lat} lng={element.long} zoom={zoom} />;
  });

  const updateZoom = ({ center, zoom }) => {
    setZoom(zoom);
  };

  return (
    <Container fluid className="map-page page">
      <h1>Map</h1>
      <div style={{ height: '75vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={0}
          onChange={updateZoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    </Container>
  );
};

export default Map;
