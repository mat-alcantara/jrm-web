import React from 'react';
import AntDashboard from '../../../../components/AntDashboard';

import { Container } from './styles';

const CreateCustomer: React.FC = () => {
  return (
    <AntDashboard>
      <Container>Crie um novo cliente</Container>
    </AntDashboard>
  );
};

export default CreateCustomer;
