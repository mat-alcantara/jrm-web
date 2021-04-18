import styled from 'styled-components';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    margin: 0 auto;

    > input {
      margin-bottom: 8px;
    }

    div {
      display: flex;
      flex-direction: row;
    }
  }
`;
