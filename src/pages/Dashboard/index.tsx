import React from 'react';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

const Dashboard: React.FC = () => {
  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Dashboard</h1>
          <p>
            Página dedicada a exibir informações. Ex: Cortes em produção,
            liberados para entrega, quantidade de cortes, materiais necessários,
            etc...
          </p>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default Dashboard;
