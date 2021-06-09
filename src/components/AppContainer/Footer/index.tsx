import React from 'react';
import { Grid } from 'antd';

import { Container } from './styles';

const Footer: React.FC = () => {
  const breakpoints = Grid.useBreakpoint();

  return (
    <Container breakpoints={breakpoints}>
      JRM Compensados ©2021 Created by Mateus Alcantara
    </Container>
  );
};

export default Footer;
