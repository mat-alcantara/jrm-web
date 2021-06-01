import React, { useState } from 'react';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import { Container } from './styles';

import AuthSection from './AuthSection';

const NewCutlist: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  if (!isAuthenticated) {
    return (
      <AntDashboard>
        <AntContent>
          <AuthSection setIsAuthenticated={setIsAuthenticated} />
        </AntContent>
      </AntDashboard>
    );
  }

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Ok</h1>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;
