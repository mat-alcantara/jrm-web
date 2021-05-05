import styled from 'styled-components';

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
