import styled, { css } from 'styled-components';
import { Layout } from 'antd';

import IBreakpoints from '../../../types/IBreakpoints';

const { Content } = Layout;

interface IContainerProps {
  breakpoints: IBreakpoints;
}

export const Container = styled(Content)<IContainerProps>`
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.breakpoints.sm
      ? css`
          padding: 32px 64px;
        `
      : css`
          padding: 16px 32px;
        `}
`;
