import React from 'react';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

const MaterialsList: React.FC = () => {
  return (
    <AntDashboard>
      <AntContent>
        <Container />
      </AntContent>
    </AntDashboard>
  );
};

export default MaterialsList;
