import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Typography } from 'antd';

import { useOrder } from '../../hooks/Order';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import IOrder from '../../types/IOrder';

const Dashboard: React.FC = () => {
  const { loadOrders } = useOrder();

  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [deliveryAllowed, setDeliveryAllowed] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function loadOrdersFromHook() {
      const allOrdersFromHook = await loadOrders();

      setAllOrders([...allOrdersFromHook]);

      const pedidosLiberadosParaTransporte = allOrdersFromHook.filter(
        (order) => order.orderStatus === 'Liberado para Transporte',
      );

      setDeliveryAllowed(pedidosLiberadosParaTransporte.length);

      allOrdersFromHook.forEach((order) =>
        setTotalValue((prevVal) => prevVal + order.price),
      );
    }

    loadOrdersFromHook();
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Typography.Title level={2}>Estatísticas</Typography.Title>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ marginTop: '32px' }}
            align="middle"
            justify="center"
          >
            <Col span={6}>
              <Statistic
                title="Cortes Liberados para transporte"
                value={deliveryAllowed}
              />
            </Col>
            <Col span={6}>
              <Statistic title="Cortes totais" value={allOrders.length} />
            </Col>

            <Col span={6}>
              <Statistic title="Valor total" value={totalValue} />
            </Col>
          </Row>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default Dashboard;
