import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 1.25rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.625rem;

  a {
    color: #fff;
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    padding-inline: 10rem;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
