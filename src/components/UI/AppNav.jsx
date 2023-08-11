import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function AppNav({ user }) {
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

            {user
              ? (
                <>
                  <Nav.Link href="/profile">Профиль</Nav.Link>
                  <Nav.Link onClick={logoutHandler}>Выйти</Nav.Link>
                </>
              )
              : (
                <NavDropdown title="Авторизация" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/auth/signup">Зарегистрироваться</NavDropdown.Item>
                  <NavDropdown.Item href="/auth/login">Войти</NavDropdown.Item>
                </NavDropdown>
              )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
