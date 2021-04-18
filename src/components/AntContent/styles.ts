import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const StyledContent = styled(Content)`
  margin-top: 16px;
  margin-bottom: 16px;

  div {
    min-height: 280px;
    height: 100%;
    max-width: 1350px;
    padding: 24px;
    background: #fff;
    margin: 0 auto;
    text-align: center;
  }
`;
