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
  const [map, setMap] = useState(false);

  const AnyReactComponent = () => (
    <img src={bottle} alt="bottle" style={{ width: `${zoom / 2}vw` }} />
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
      amount: 0,
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
          amount: values.amount,
        },
        { headers: header }
      ).then((res) => {
        setMarkerLat(0);
        setMarkerLng(0);
        setZoom(0);
        formik.values.amount = 0;
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

  const toggleMap = () => {
    setMap(!map);
  };

  return (
    <Container fluid className="create-page page">
      <h1>Create</h1>

      <Form onSubmit={formik.handleSubmit} className="form">
        <Form.Group>
          <Form.Label>Message</Form.Label>
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
          <Form.Group>
            <Form.Label>To (optional)</Form.Label>
            <Form.Control
              id="recipient"
              name="recipient"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.recipient}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time to arrive</Form.Label>
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

          <Form.Group>
            <Form.Label>Amount (Up to 2000 USD)</Form.Label>
            <Form.Control
              id="amount"
              name="amount"
              type="number"
              step={0.01}
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount && (
              <Form.Text className="error">{formik.errors.amount}</Form.Text>
            )}
          </Form.Group>
        </Row>

        <Col className="button-group">
          <Button onClick={toggleMap}>{`${
            map ? 'Collapse' : 'Display'
          } Map`}</Button>

          {map && (
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
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Create;
