import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { Container } from '../../styles/Global';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

const isValidPassword =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{6,20}/;

export function validateForm(email, password) {
  if (!isEmail(email)) {
    toast.error('Invalid email');
    return true;
  }

  if (!isValidPassword.test(password)) {
    toast.error(
      'Password must have at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol'
    );
    return true;
  }

  return false;
}

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let formHasError = false;

    if (name.length < 2 || name.length > 255) {
      formHasError = true;
      toast.error('Field "name" must be between 2 and 255 characters!');
      return;
    }

    formHasError = validateForm(email, password);

    if (formHasError) {
      return;
    }

    try {
      await axios.post('/users', {
        name,
        password,
        email,
      });
      toast.success('Successfully created account');
      history.push('/sign-in');
    } catch (err) {
      const { errors } = err.response.data ?? [];
      errors.forEach((error) => {
        const handledError = error.charAt(0).toUpperCase() + error.slice(1);
        toast.error(handledError);
      });
    }
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="name">
          Name
          <input
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            placeholder="Your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="password"
            id="password"
          />
          <small>
            Password must have at least 1 lowercase letter, 1 uppercase letter,
            1 number and 1 symbol, between 6 and 20 characters
          </small>
        </label>
        <button type="submit">Sign Up</button>
      </Form>
    </Container>
  );
}
