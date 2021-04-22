import React from 'react';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

const CustomersList: React.FC = () => {
  return (
    <AntDashboard>
      <AntContent>
        <h1>Lista de clientes</h1>
      </AntContent>
    </AntDashboard>
  );
};

export default CustomersList;
