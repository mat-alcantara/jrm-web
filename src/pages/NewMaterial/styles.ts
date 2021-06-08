import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;

    > div {
      width: 100%;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 16px;

      > div {
        width: 100%;
      }

      div + div {
        margin-left: 8px;
      }
    }
  }
`;
