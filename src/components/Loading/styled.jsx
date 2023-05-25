import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .base {
    z-index: 2;
    width: 3rem;
    height: 3rem;
    border: 7px solid #ffffff66;
    border-radius: 50%;

    position: relative;
  }

  .spinner {
    position: absolute;
    top: -7px;
    left: -17px;
    width: 67px;
    height: 45px;
    border: solid 8px #000;
    border-color: #fff transparent transparent transparent;
    border-radius: 173%/144px 147px 0 0;
    animation: 2s infinite spin;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
