import React, { useState } from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';
import GoogleMapReact from 'google-map-react';
import * as Yup from 'yup';

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

  const createSchema = Yup.object().shape({
    content: Yup.string().required('Required'),
    can_reply: Yup.string().required('Required'),
  });

  const header = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  const formik = useFormik({
    initialValues: {
      content: '',
      recipient: '',
      can_reply: false,
      tta: 0,
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      Axios.post(
        'https://castaway-304704.uc.r.appspot.com/api/bottle/',
        {
          content: values.content,
          recipient: values.recipient,
          lat: markerLat,
          long: markerLng,
          tta: values.tta,
          canReply: values.canReply,
          opened: false,
        },
        { headers: header }
      ).then((res) => {
        setMarkerLat(0);
        setMarkerLng(0);
        setZoom(0);
        formik.values.can_reply = false;
        formik.values.content = '';
        formik.values.recipient = '';
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
    <Container fluid className="create-page page">
      <h1>Create</h1>

      <Form onSubmit={formik.handleSubmit} className="form">
        <Form.Group controlId="content">
          <Form.Label htmlFor="content">Message</Form.Label>
          <Form.Control
            id="content"
            name="content"
            as="textarea"
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <Form.Text className="error">{formik.errors.content}</Form.Text>
          )}
        </Form.Group>

        <Row className="form-row">
          <Form.Group controlId="recipient">
            <Form.Label htmlFor="recipient">To (optional)</Form.Label>
            <Form.Control
              id="recipient"
              name="recipient"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.recipient}
            />
          </Form.Group>

          <Form.Group controlId="tta">
            <Form.Label htmlFor="tta">Time to arrive</Form.Label>
            <Form.Control
              id="tta"
              name="tta"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.tta}
            />
            {formik.touched.tta && formik.errors.tta && (
              <Form.Text className="error">{formik.errors.tta}</Form.Text>
            )}
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

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
