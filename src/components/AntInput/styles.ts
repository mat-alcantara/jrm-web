import styled from 'styled-components';
import { Input } from 'antd';
import Tooltip from '../Tooltip';

export const Container = styled(Input)`
  svg {
    color: #a9a9a9;
    margin-right: 8px;
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
