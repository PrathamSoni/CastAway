import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Map from './map/Map';
import Create from './create/Create';
import Sent from './sent/Sent';
import Recieved from './recieved/Recieved';
import About from './about/About';
import Login from './login/Login';
import Signup from './signup/Signup';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './App.scss';

const App = () => {
  const [page, setPage] = useState(Map);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const pages = [
    { title: 'Map', path: 'map', component: Map, id: 0 },
    { title: 'Create', path: 'create', component: Create, id: 1 },
    { title: 'Sent', path: 'sent', component: Sent, id: 2 },
    { title: 'Recieved', path: 'recieved', component: Recieved, id: 3 },
    { title: 'About', path: 'About', component: About, id: 4 },
  ];

  if(!token) {
    return (
      <>
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/">
          <Login setToken={setToken} />
        </Route>
      </Switch>
    </BrowserRouter>
    </>);
  }

  return (
    <div className="App">
      <Navbar />
      <Container fluid className="body">
        <Row>
          <Col xs={4} className="left-col">
            {pages.map(({ title, component }) => (
              <Button onClick={() => setPage(component)}>
                <h3>{title}</h3>
              </Button>
            ))}
          </Col>
          <Col xs={8} className="right-col">
            {page}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
