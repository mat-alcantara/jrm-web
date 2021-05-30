import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

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

export const StepsContainer = styled.div`
  margin-bottom: 32px;
  max-width: 900px;
  width: 100%;
`;

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

export const CutlistPageContainer = styled.div``;

export const InputCutlistContainer = styled.div`
  margin-top: 32px;

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;

    .materialSelect div .react-select__value-container {
      width: 275px;
    }

    > div + input {
      margin-left: 8px;
    }

    > input + div {
      margin-left: 8px;
    }

    > input + input {
      margin-left: 8px;
    }

    > span {
      margin-right: 8px;
      margin-left: 8px;
    }

    button {
      margin-left: 8px;
    }
  }
`;

export const ChangePageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 64px;

  button {
    width: 100%;
  }

  button + button {
    margin-left: 16px;
  }
`;
