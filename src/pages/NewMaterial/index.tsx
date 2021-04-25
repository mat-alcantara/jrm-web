import React from 'react';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

const NewMaterial: React.FC = () => {
  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>New material</h1>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewMaterial;
