import styled from 'styled-components';
import Select from 'react-select';

export const StyledReactSelect = styled(Select)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .react-select__control {
    width: 100%;
    margin-bottom: 8px;
    border-color: red;
  }
`;
