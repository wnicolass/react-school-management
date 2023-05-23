import React from 'react';
import { useDispatch } from 'react-redux';
import { Title, Paragraph } from './styled';
import { Container } from '../../styles/Global';
import * as actionExamples from '../../store/modules/example/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();

    dispatch(actionExamples.buttonClickRequest());
  }

  return (
    <Container>
      <Title>
        Sign In
        <small>Test</small>
      </Title>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </Container>
  );
}
