import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  background: #fff;
  padding: 16px 64px;
  height: 164px;
  align-items: center;
  justify-content: left;

  img {
    height: 80px;
    width: 260px;
  }
`;
