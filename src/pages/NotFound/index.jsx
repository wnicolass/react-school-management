import React from 'react';
import { Paragraph, Title } from './styled';
import { Container } from '../../styles/Global';

export default function PageNotFound() {
  return (
    <Container>
      <Title>404 Not Found</Title>
      <Paragraph>This is not the web page you are looking for.</Paragraph>
    </Container>
  );
}
