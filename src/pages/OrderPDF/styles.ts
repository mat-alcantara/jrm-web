import styled from 'styled-components';
import { Text, View } from '@react-pdf/renderer';

export const Container = styled(View)`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 32px 16px;
`;

export const Title = styled(Text)`
  font-size: 200px;
`;
