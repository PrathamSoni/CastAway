import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Logo from '../logo.png';

import './Navbar.scss';

const SiteNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand href="/" className="brand-container">
        <img src={Logo} alt="" />
        <p className="logo">Castaway</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto nav">
          <Nav.Link href="/sign-up">
            <p>Sign Up</p>
          </Nav.Link>
          <Nav.Link href="/login">
            <p>Login</p>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SiteNavbar;
