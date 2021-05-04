import styled from 'styled-components';

export const CustomerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

export const CustomerAutocompleteAndButton = styled.div`
  display: flex;
  flex-direction: row;

  div {
    min-width: 300px;
  }

  button {
    margin-left: 8px;
  }
`;

export const CustomerPageData = styled.div`
  margin-top: 138px;
`;
