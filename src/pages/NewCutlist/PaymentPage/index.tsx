import React from 'react';
import { Typography } from 'antd';

import { Container } from './styles';

const PaymentPage: React.FC = () => {
  return (
    <Container>
      <Typography.Title level={2}>Dados do pedido</Typography.Title>
    </Container>
  );
};

export default PaymentPage;
