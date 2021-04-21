import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const StyledContent = styled(Content)`
  /* Make container don't merge with header and footer */
  margin-top: 16px;
  margin-bottom: 16px;

  /* Container inside content area */
  > div {
    min-height: calc(100vh - 32px - 24px - 22px - 64px);
    height: 100%;
    max-width: 1350px;
    padding: 24px;
    background: #fff;
    margin: 0 auto;
    text-align: center;
  }
`;
