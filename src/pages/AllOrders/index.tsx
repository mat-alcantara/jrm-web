import React from 'react';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import { Container } from './styles';

const AllOrders: React.FC = () => {
  return (
    <AntDashboard>
      <AntContent>
        <Container />
      </AntContent>
    </AntDashboard>
  );
};

export default AllOrders;
