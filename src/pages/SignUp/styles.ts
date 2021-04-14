import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled(Card)`
  width: 500px;

  padding: 128px 64px;

  h1 {
    text-align: center;
  }

  div {
    > input {
      margin-bottom: 8px;
    }

    > span {
      margin-bottom: 8px;
    }
  }
`;
