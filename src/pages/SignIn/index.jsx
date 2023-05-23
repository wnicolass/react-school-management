import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/Global';
import { Form } from '../SignUp/styled';
import { validateForm } from '../SignUp';
import * as actions from '../../store/modules/auth/actions';

export default function SignIn({ location }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(location);
  // eslint-disable-next-line react/destructuring-assignment
  const prevPath = location.state?.prevPath ?? '/';

  async function handleSubmit(event) {
    event.preventDefault();
    const formHasError = validateForm(email, password);

    if (formHasError) {
      return;
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <h1>Sign In</h1>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="email">
          Email
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
        </label>
        <button type="submit">Sign In</button>
      </Form>
    </Container>
  );
}

const locationShape = {
  hash: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.any,
};

SignIn.propTypes = {
  location: PropTypes.shape(locationShape).isRequired,
};
