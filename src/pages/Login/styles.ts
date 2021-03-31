import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 64px;

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
      font-size: 48px;
    }

    input {
      text-align: center;
      width: 535px;
      margin-bottom: 8px;
      height: 53px;
      font-size: 24px;
    }

    button {
      width: 300px;
      height: 53px;
      background-color: #e76905;
    }
  }
`;
