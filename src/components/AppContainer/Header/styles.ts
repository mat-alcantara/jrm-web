import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const Container = styled(Header)`
  position: relative;
  z-index: 10;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;

  h3 {
    margin-bottom: 0;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
