import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Logo from '../logo.png';

import './Auth.scss';

const Login = ({ setToken }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      Axios.post('https://castaway-304704.uc.r.appspot.com/api/login/', {
        username: values.username,
        password: values.password,
      }).then((res) => {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      });
    },
  });

  return (
    <Container fluid className="auth-body">
      {' '}
      <div className="logo">
        <img src={Logo} alt="" />
        <p>CastAway</p>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="disclaimer">
        <span style={{ color: '#000000' }}>Don't have an account?</span>{' '}
        <Link to="/signup">Sign up here.</Link>
      </p>
    </Container>
  );
};

export default Login;
