import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.less'; // CSS files of antd
import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks'; // Allows the use of all hooks by the app

import AppContainer from './components/AppContainer';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppContainer>
          <Routes />
        </AppContainer>
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
