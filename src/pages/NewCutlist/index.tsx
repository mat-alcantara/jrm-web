import React, { useState } from 'react';

import { Container } from './styles';

import AuthSection from './AuthSection';

const NewCutlist: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <AuthSection setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <Container>
      <h1>Ok</h1>
    </Container>
  );
};

export default NewCutlist;
