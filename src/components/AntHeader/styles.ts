import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  background-color: #fff;

  h1 {
    color: #b46530;
  }
`;

export const StyledMenu = styled(Menu)`
  margin-left: 150px;
`;
