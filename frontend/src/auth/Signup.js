import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Logo from '../logo.png';

import './Auth.scss';

const Signup = ({ setToken }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password1: '',
      password2: '',
      email: '',
      first: '',
      last: '',
    },
    onSubmit: (values) => {
      Axios.post('https://castaway-304704.uc.r.appspot.com/api/signup/', {
        username: values.username,
        password1: values.password1,
        password2: values.password2,
        email: values.email,
        first_name: values.first,
        last_name: values.last,
      }).then((res) => {
        history.push("/");
      });
    },
  });

  return (
    <Container fluid className="auth-body">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group className="form-col left">
            <Form.Label htmlFor="first">First Name</Form.Label>
            <Form.Control
              id="first"
              name="first"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first}
            />
          </Form.Group>
          <Form.Group className="form-col right">
            <Form.Label htmlFor="last">Last Name</Form.Label>
            <Form.Control
              id="last"
              name="last"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.last}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password1">Password</Form.Label>
          <Form.Control
            id="password1"
            name="password1"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password1}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password2">Confirm Password</Form.Label>
          <Form.Control
            id="password2"
            name="password2"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password2}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="disclaimer">
        <span style={{ color: '#000000' }}>Already have an account?</span>{' '}
        <Link to="/login">login here.</Link>
      </p>
    </Container>
  );
};

export default Signup;
