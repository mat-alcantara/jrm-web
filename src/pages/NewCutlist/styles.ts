import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CustomerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    width: 100%;

    button {
      margin-left: 8px;
    }
  }
`;

export const StepsContainer = styled.div`
  margin-top: 128px;
  max-width: 900px;
  width: 100%;
`;
