import styled from 'styled-components';

export const DataPageContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 500px;

  button {
    margin: 8px 0px;
  }
`;

export const DataPageNextAndBackButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    width: 300px;
  }

  button + button {
    margin-left: 8px;
  }
`;
