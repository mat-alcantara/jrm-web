import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 480px;
    margin: 0 auto;

    /* input {
      margin-bottom: 8px;
    } */

    > div {
      display: flex;
      flex-direction: row;
    }
  }
`;
