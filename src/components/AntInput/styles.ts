import styled, { css } from 'styled-components';
import { Input } from 'antd';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isfocused: number;
  isfilled: number;
  iserrored: number;
}

export const Container = styled(Input)<ContainerProps>`
  margin-bottom: 8px;
  svg {
    color: #a9a9a9;
    margin-right: 8px;

    /* CSS in case of input is focused */
    ${(props) =>
      (props.isfocused || props.isfilled) &&
      css`
        color: #4f0e00;
      `}
  }

  /* CSS in case of input is errored */
  ${(props) =>
    props.iserrored &&
    css`
      border-color: #b00020;
    `}
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
