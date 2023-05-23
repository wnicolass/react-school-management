import '@fontsource/source-sans-pro';
import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  body, body * {
    font-family: 'Source Sans Pro', sans-serif;
  }

  html, body, #root {
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    background-color: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    background-color: ${colors.primaryColor};
  }

  ul {
    list-style-type: none;
  }
`;

export const Container = styled.section`
  width: min(50rem, 80%);
  background-color: #fff;
  margin: 2rem auto 0 auto;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
