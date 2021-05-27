import styled, { css } from 'styled-components';
import Select from 'react-select';

interface IReactSelectProps {
  iserrored: number;
}

export const StyledReactSelect = styled(Select)<IReactSelectProps>`
  width: 100%;

  .react-select__control {
    width: 100%;
    margin-bottom: 8px;
  }

  ${(props) =>
    props.iserrored &&
    css`
      .react-select__control {
        border-color: red;

        &:hover {
          border-color: red;
        }
      }
    `}
`;
