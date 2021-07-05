import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Grid, Divider, Button } from 'antd';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';
import { useCortecloud } from '../../hooks/Cortecloud';

import { Container } from './styles';

import IOrder from '../../types/IOrder';
import ICustomer from '../../types/ICustomer';

import AppContainer from '../../components/AppContainer';

const Dashboard: React.FC = () => {
  const { loadOrders, updateOrderStatus } = useOrder();
  const { loadCustomers } = useCustomer();
  const { orders, updateStatus } = useCortecloud();
  const breakpoints = Grid.useBreakpoint();

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
    <AppContainer>
      <Container>
        <Row justify="center">
          <Col sm={0} xs={24} style={{ margin: '0 auto 16px auto' }}>
            <Typography.Title level={4}>Lista de Cortes</Typography.Title>
          </Col>

          <Col
            xs={24}
            md={8}
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
                  {`${order.orderStore.toUpperCase()} - ${order.order_code}: ${
                    customerFound.name
                  } [${order.deliveryDate}]`}
                  <Button
                    type="primary"
                    onClick={() =>
                      updateOrderStatus(order.id, 'Liberado para Transporte')
                    }
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Produzido
                  </Button>
                </p>
              );
            })}
          </Col>
          <Col xs={24} sm={0}>
            <Divider />
          </Col>
          <Col xs={24} md={8}>
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
                  {`${order.orderStore.toUpperCase()} - ${order.order_code}: ${
                    customerFound.name
                  } [${order.deliveryDate}]`}
                  <Button
                    type="primary"
                    onClick={() => updateOrderStatus(order.id, 'Transportado')}
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Transportado
                  </Button>
                </p>
              );
            })}
          </Col>
          <Col xs={24} sm={0}>
            <Divider />
          </Col>
          <Col xs={24} md={8}>
            <Typography.Title level={breakpoints.sm ? 4 : 5}>
              Transportados
            </Typography.Title>
            {allOrders.map((order) => {
              if (order.orderStatus !== 'Transportado') {
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
                  {`${order.orderStore.toUpperCase()} - ${order.order_code}: ${
                    customerFound.name
                  } [${order.deliveryDate}]`}
                  <Button
                    type="primary"
                    onClick={() => updateOrderStatus(order.id, 'Entregue')}
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Recebido
                  </Button>
                </p>
              );
            })}
          </Col>
        </Row>
        <Divider />
        <Row
          justify="center"
          style={{
            marginTop: '64px',
          }}
        >
          <Col xs={24} md={0}>
            <Typography.Title level={4}>Cortecloud</Typography.Title>
          </Col>
          <Col md={8} xs={24}>
            <Typography.Title level={4}>
              Cortecloud - Em produção
            </Typography.Title>
            {orders.map((order) => {
              if (order.status !== 'Em Produção') {
                return null;
              }

              return (
                <p key={order.code}>
                  {`${order.store.toUpperCase()} - ${order.code}: ${
                    order.name
                  } [${order.delivery}]`}
                  <Button
                    type="primary"
                    onClick={() =>
                      updateStatus(order.code, 'Liberado para Transporte')
                    }
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Produzido
                  </Button>
                </p>
              );
            })}
          </Col>
          <Col xs={24} sm={0}>
            <Divider />
          </Col>
          <Col md={8} xs={24}>
            <Typography.Title level={4}>
              Cortecloud - Liberados para transporte
            </Typography.Title>
            {orders.map((order) => {
              if (order.status !== 'Liberado para Transporte') {
                return null;
              }

              return (
                <p key={order.code}>
                  {`${order.store.toUpperCase()} - ${order.code}: ${
                    order.name
                  } [${order.delivery}]`}
                  <Button
                    type="primary"
                    onClick={() => updateStatus(order.code, 'Transportado')}
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Transportado
                  </Button>
                </p>
              );
            })}
          </Col>
          <Col xs={24} sm={0}>
            <Divider />
          </Col>
          <Col md={8} xs={24}>
            <Typography.Title level={4}>
              Cortecloud - Transportados
            </Typography.Title>
            {orders.map((order) => {
              if (order.status !== 'Transportado') {
                return null;
              }

              return (
                <p key={order.code}>
                  {`${order.store.toUpperCase()} - ${order.code}: ${
                    order.name
                  } [${order.delivery}]`}
                  <Button
                    type="primary"
                    onClick={() => updateStatus(order.code, 'Entregue')}
                    style={{ marginLeft: '16px' }}
                    size="small"
                  >
                    Recebido
                  </Button>
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
