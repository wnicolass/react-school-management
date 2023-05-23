import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  label {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  }

  small {
    font-size: 0.8rem;
    color: #6e6d6d;
  }

  input {
    height: 2rem;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-top: 0.5rem;

    &:focus {
      outline-color: ${colors.primaryColor};
    }
  }
`;
