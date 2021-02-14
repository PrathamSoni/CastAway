import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Map from './map/Map';
import Create from './create/Create';
import Sent from './sent/Sent';
import Received from './received/Received';
import About from './about/About';
import Login from './auth/Login';
import Signup from './auth/Signup';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './App.scss';
import './Page.scss';

const App = () => {
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem('lng', position.coords.longitude);
      localStorage.setItem('lat', position.coords.latitude);
    });
  }, []);

  require('dotenv').config();
  if (!token) {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login setToken={setToken} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

  const pages = [
    { title: 'Map', path: 'map', component: <Map />, id: 0 },
    { title: 'Create', path: 'create', component: <Create />, id: 1 },
    { title: 'Sent', path: 'sent', component: <Sent />, id: 2 },
    { title: 'Received', path: 'received', component: <Received />, id: 3 },
    { title: 'About', path: 'About', component: <About />, id: 4 },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Container fluid className="body">
          <Row>
            <Col xs={2} className="left-col">
              {pages.map(({ title, id }) => (
                <Button
                  onClick={() => setPage(id)}
                  className={page !== id && 'inactive'}
                >
                  <h3
                    style={
                      page !== id ? { color: '#006cff' } : { color: '#ffffff' }
                    }
                  >
                    {title}
                  </h3>
                </Button>
              ))}
            </Col>
            <Col xs={10} className="right-col">
              {pages[page].component}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
