import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #b46530;
  text-align: center;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 3px solid #b46530;
  color: #fff;

  /* CSS in case of input is errored */
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #b00020;
    `}

  /* CSS in case of input is focused */
  ${(props) =>
    props.isFocused &&
    css`
      color: #4f0e00;
      border-color: #4f0e00;
    `}

  /* CSS in case of input is filled */
  ${(props) =>
    props.isFilled &&
    css`
      color: #4f0e00;
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1; // Ocupa todo o espaço possivel do container

    color: #fff;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #fff;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0;
  }

  span {
    background: #b00020;
    color: #fff;

    &::before {
      border-color: #b00020 transparent;
    }
  }
`;
