/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #b46530;
  text-align: center;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #b46530;
  color: #fff;

  ${(props) =>
    props.isFocused &&
    css`
      color: #4f0e00;
      border-color: #4f0e00;
    `}

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
