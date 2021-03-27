import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    align-items: center;

    h1 {
      margin: 64px auto 16px auto;
    }

    input {
      text-align: center;
      min-width: 350px;
      margin-bottom: 8px;
      height: 32px;
    }

    button {
      min-width: 350px;
      padding: 8px 0;
    }
  }
`;
