import styled from 'styled-components';

export const StudentContainer = styled.table`
  margin-top: 1rem;
  width: 100%;

  tr:not(.ProfilePic) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;

    border-bottom: 1px solid #cccccc9c;
  }

  tr td {
    text-align: center;
  }

  @media screen and (max-width: 728px) {
    tr {
      font-size: 0.9rem;
    }
    tr img,
    tr svg {
      width: 2rem;
    }

    tr a svg {
      width: 1rem;
    }
  }
`;

export const ProfilePicture = styled.td`
  img {
    width: 4rem;
    border-radius: 50%;
  }
`;
