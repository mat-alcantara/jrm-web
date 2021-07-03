import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Grid, Divider } from 'antd';

import { useReactToPrint } from 'react-to-print';
import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';
import { useAuth } from '../../hooks/Auth';

import { Container } from './styles';

import IOrder from '../../types/IOrder';
import ICustomer from '../../types/ICustomer';

import AppContainer from '../../components/AppContainer';
import OrderResume from '../../components/OrderResume';

const Dashboard: React.FC = () => {
  const { loadOrders } = useOrder();
  const { loadCustomers } = useCustomer();
  const { signOut } = useAuth();
  const breakpoints = Grid.useBreakpoint();

  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    async function loadOrdersFromHook() {
      const allOrdersFromHook = await loadOrders();

      setAllOrders([...allOrdersFromHook]);
    }

    async function loadCustomersFromHook() {
      const allCustomersFromHook = await loadCustomers();

      setAllCustomers([...allCustomersFromHook]);
    }

    try {
      loadOrdersFromHook();
      loadCustomersFromHook();
    } catch {
      signOut();
    }
  }, []);

  return (
    <AppContainer>
      <OrderResume componentRef={componentRef} />
      <button type="button" onClick={handlePrint}>
        Imprimir PDF
      </button>
      <Container>
        <Row
          justify="center"
          style={{
            textAlign: 'center',
          }}
        >
          <Col sm={0} xs={24} style={{ margin: '0 auto 16px auto' }}>
            <Typography.Title level={4}>Lista de Cortes</Typography.Title>
          </Col>

          <Col
            xs={24}
            md={9}
            style={{ marginBottom: breakpoints.sm ? '0px' : '8px' }}
          >
            <Typography.Title level={breakpoints.sm ? 4 : 5}>
              Em Produção
            </Typography.Title>
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
          <Col xs={24} sm={0}>
            <Divider />
          </Col>
          <Col xs={24} md={9}>
            <Typography.Title level={breakpoints.sm ? 4 : 5}>
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
    </AppContainer>
  );
};

export default Dashboard;
