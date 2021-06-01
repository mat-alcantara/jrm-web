import React from 'react';
import { Grid } from 'antd';

import { Container } from './styles';

const Content: React.FC = ({ children }) => {
  const breakpoints = Grid.useBreakpoint();

  return <Container breakpoint={breakpoints}>{children}</Container>;
};

export default Content;
