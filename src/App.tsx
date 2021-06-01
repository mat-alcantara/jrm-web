import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.less'; // CSS files of antd
import { Layout } from 'antd';
import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks'; // Allows the use of all hooks by the app

import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const { Content } = Layout;

  return (
    <Router>
      <AppProvider>
        <Layout>
          <Header />
          <Content>
            <Routes />
          </Content>
          <Footer />
        </Layout>
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
