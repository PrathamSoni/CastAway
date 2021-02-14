import React, { useState } from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';
import GoogleMapReact from 'google-map-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import bottle from './bottle.png';

import './Create.scss';

const Create = () => {
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);
  const [zoom, setZoom] = useState(0);

  const AnyReactComponent = () => (
    <img style={{ width: `${zoom / 2}vw` }} src={bottle} alt="bottle" />
  );

  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  const formik = useFormik({
    initialValues: {
      content: '',
      recipient: 0,
      lat: 0,
      long: 0,
      can_reply: false,
      tta: 0,
    },
    onSubmit: (values) => {
      Axios.post(
        'https://castaway-304704.uc.r.appspot.com/api/bottle/',
        {
          content: values.content,
          recipient: values.recipient,
          lat: values.lat,
          long: values.long,
          tta: values.tta,
          canReply: values.canReply,
        },
        { headers: header }
      ).then((res) => {
        console.log(res);
      });
    },
  });

  const updateMarker = ({ x, y, lat, lng, event }) => {
    setMarkerLat(lat);
    setMarkerLng(lng);
  };
  const updateZoom = ({ center, zoom }) => {
    setZoom(zoom);
  };

  return (
    <Container fluid className="create-page">
      <h1>Create</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label htmlFor="content">Message</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="content">Message:</label>
          <input
            id="content"
            name="content"
            type="textarea"
            onChange={formik.handleChange}
            value={formik.values.content}
          />

          <label htmlFor="recipient">To (optional):</label>
          <input
            id="recipient"
            name="recipient"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.recipient}
          />

          <label htmlFor="lat">Latitude</label>
          <input
            id="lat"
            name="lat"
            type="number"
            step="0.00000000001"
            onChange={formik.handleChange}
            value={formik.values.lat}
          />

          <label htmlFor="lat">Longitude</label>
          <input
            id="long"
            name="long"
            type="number"
            step="0.00000000001"
            onChange={formik.handleChange}
            value={formik.values.long}
          />

          <label htmlFor="can_reply">Can Reply</label>
          <input
            id="can_reply"
            name="can_reply"
            type="checkbox"
            onChange={formik.handleChange}
            value={formik.values.can_reply}
          />

          <label htmlFor="tta">Time to arrive:</label>
          <input
            id="tta"
            name="tta"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />

          <button type="submit">Submit</button>
        </form>
      </>
      <div style={{ height: '75vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API }}
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={0}
          onChange={updateZoom}
          onClick={updateMarker}
        >
          <AnyReactComponent lat={markerLat} lng={markerLng} />
        </GoogleMapReact>
      </div>
    </Container>
  );
};

export default Create;
