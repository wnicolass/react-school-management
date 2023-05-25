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

  td {
    width: 6rem;
  }

  tr td {
    display: flex;
    align-items: center;
    justify-content: center;
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

    tr td {
      width: 3rem;
    }
  }
`;

export const ProfilePicture = styled.td`
  img {
    width: 4rem;
    border-radius: 50%;
  }
`;
