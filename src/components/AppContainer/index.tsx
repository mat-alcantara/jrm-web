import React from 'react';

import { Container } from './styles';

import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const AppContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default AppContainer;
