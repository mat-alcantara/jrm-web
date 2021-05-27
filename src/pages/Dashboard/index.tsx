import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import IOrder from '../../types/IOrder';
import ICustomer from '../../types/ICustomer';

const Dashboard: React.FC = () => {
  const { loadOrders } = useOrder();
  const { loadCustomers } = useCustomer();

  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    async function loadOrdersFromHook() {
      const allOrdersFromHook = await loadOrders();

      setAllOrders([...allOrdersFromHook]);
    }

    async function loadCustomersFromHook() {
      const allCustomersFromHook = await loadCustomers();

      setAllCustomers([...allCustomersFromHook]);
    }

    loadOrdersFromHook();
    loadCustomersFromHook();
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <Row align="middle" justify="center" style={{ marginTop: '32px' }}>
            <Col xl={12}>
              <Typography.Title level={4}>Em Produção</Typography.Title>
              {allOrders.map((order) => {
                if (order.orderStatus !== 'Em Produção') {
                  return null;
                }

                const customerFound = allCustomers.find(
                  (customer) => customer.id === order.customerId,
                );

                if (!customerFound) {
                  return null;
                }

                return (
                  <p key={order.id}>
                    {`${order.order_code} - ${customerFound.name} - ${order.deliveryDate}`}
                  </p>
                );
              })}
            </Col>
            <Col xl={12}>
              <Typography.Title level={4}>
                Liberados para transporte
              </Typography.Title>
              {allOrders.map((order) => {
                if (order.orderStatus !== 'Liberado para Transporte') {
                  return null;
                }

                const customerFound = allCustomers.find(
                  (customer) => customer.id === order.customerId,
                );

                if (!customerFound) {
                  return null;
                }

                return (
                  <p key={order.id}>
                    {`${order.order_code} - ${customerFound.name} - ${order.deliveryDate}`}
                  </p>
                );
              })}
            </Col>
          </Row>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default Dashboard;
