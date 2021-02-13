import React from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Create.scss';

const Create = () => {
  const header = {Authorization: `Bearer ${localStorage.getItem("token")}`};
  const formik = useFormik({
    initialValues: {
      content: '',
      recipient: '',
      lat:0,
      long:0,
      can_reply:false,
      tta:0
    },
    onSubmit: values => {
        Axios.post("https://castaway-304704.uc.r.appspot.com/api/bottle/",
        {content:values.content,
         recipient:values.recipient,
         lat:values.lat,
         long:values.long,
         dm: (!!values.recipient),
         tta:values.tta,
         index: 0,
         opened: false,
         canReply:values.canReply
        },{headers:header}
           ).then((res) => {
            console.log(res);
        });
    },
  });

  return (
    <Container fluid className="create-page">
      <h1>Create</h1>
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
    </Container>
  );
};

export default Create;
