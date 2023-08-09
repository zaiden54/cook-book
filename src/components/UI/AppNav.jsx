import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function AppNav() {
  const [currentUser, setCurrentUser] = useState();

  const logoutHandler = async () => {
    const response = await fetch('/api/auth/logout');

    if (response.ok) {
      setCurrentUser(currentUser);
      window.location = '/';
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Cook-Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/profile">Профиль</Nav.Link>
            <NavDropdown title="Авторизация" id="basic-nav-dropdown">
              <NavDropdown.Item href="/auth/signup">Зарегестрироваться</NavDropdown.Item>
              <NavDropdown.Item href="/auth/login">
                Войти
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Выйти
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
