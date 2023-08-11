import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function LoginPage() {
  const [message, setMessage] = useState(null);

  const inputsHandler = async (e) => {
    e.preventDefault();

    const inputData = Object.fromEntries(new FormData(e.target));

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      setMessage((await response.json()).message);
    }
  };
  return (
    <Form className="mt-4" onSubmit={(e) => inputsHandler(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Введите электронную почту</Form.Label>
        <Form.Control type="email" placeholder="example@example.ru" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Введите пароль</Form.Label>
        <Form.Control type="password" placeholder="Придумайте сложный!!! пароль" name="password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти
      </Button>

      <p className="mt-4">{message}</p>
    </Form>
  );
}
