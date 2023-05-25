import styled from 'styled-components';
import * as colors from '../../config/colors';

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 10px;
  position: relative;

  img {
    width: 11.25rem;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;

    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.primaryColor};
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
