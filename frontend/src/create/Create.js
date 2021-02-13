import React from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Create.scss';


const Create = () => {
  const formik = useFormik({
    initialValues: {
      content: '',
      recipient: '',
      lat:0,
      long:0,
      canReply:false,
      tta:0
    },
    onSubmit: values => {
        Axios.post("https://castaway-304704.uc.r.appspot.com/api/bottle/",
        {content:values.username, password:values.password}).then((res) => {
            
        });
    },
  });

  return (
    <Container fluid className="create-page">
      <h1>Create</h1>
      <>
        <form>

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
          type="text"
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
  
        <button type="submit">Submit</button>
      </form>
      </>
    </Container>
  );
};

export default Create;
