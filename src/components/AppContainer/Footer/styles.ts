import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import IBreakpoints from 'types/IBreakpoints';

const { Footer } = Layout;

interface IContainerProps {
  breakpoints: IBreakpoints;
}

export const Container = styled(Footer)<IContainerProps>`
  text-align: center;
  padding: 16px 32px;
  width: 100%;

  ${(props) =>
    props.breakpoints.md
      ? css`
          font-size: 16px;
        `
      : css`
          font-size: 12px;
        `}
`;
