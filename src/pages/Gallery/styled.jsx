import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 12.25rem;
    height: 12.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 1rem auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    width: 12.25rem;
    height: 12.25rem;
  }

  input {
    display: none;
  }
`;
