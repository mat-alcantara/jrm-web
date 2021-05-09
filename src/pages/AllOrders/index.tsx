import React, { useCallback, useEffect, useState } from 'react';
import { Table, Space, Typography } from 'antd';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntButton from '../../components/AntButton';

import ICustomer from '../../types/ICustomer';
import IOrder from '../../types/IOrder';

import { Container } from './styles';

interface IDataSource {
  key: string;
  customerName: string;
  order_code: number;
  orderStore: string;
  orderStatus: string;
  price: number;
  deliveryDate: string;
}

const AllOrders: React.FC = () => {
  const { loadOrders, removeOrder, generatePDF } = useOrder();
  const { loadCustomers } = useCustomer();

  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);

  useEffect(() => {
    async function loadCustomersFromHook() {
      const allCustomersFromHook = await loadCustomers();

      setAllCustomers([...allCustomersFromHook]);
    }

    async function loadOrdersFromHook() {
      const allOrdersFromHook = await loadOrders();

      setAllOrders([...allOrdersFromHook]);
    }

    function setDataSourceFromHook() {
      const dataToSetDataSource = allOrders.map((order) => {
        const customerFound = allCustomers.find(
          (customer) => customer.id === order.customerId,
        );

        return {
          key: order.id,
          order_code: order.order_code,
          orderStore: order.orderStore,
          orderStatus: order.orderStatus,
          deliveryDate: order.deliveryDate,
          price: order.price,
          customerName: customerFound?.name || 'Cliente desconhecido',
        };
      });

      setDataSource([...dataToSetDataSource]);
    }

    loadCustomersFromHook();
    loadOrdersFromHook();
    setDataSourceFromHook();
  }, []);

  const handleRemoveOrder = useCallback(
    async (id: string) => {
      await removeOrder(id);

      const filteredDataSource = dataSource.filter((order) => order.key !== id);

      setDataSource([...filteredDataSource]);
    },
    [dataSource],
  );

  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'order_code',
      key: 'order_code',
    },
    {
      title: 'Cliente',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Loja do Pedido',
      dataIndex: 'orderStore',
      key: 'oorderStore',
    },
    {
      title: 'Status do Pedido',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      filters: [
        {
          text: 'Em Produção',
          value: 'Em Produção',
        },
        {
          text: 'Liberado para Transporte',
          value: 'Liberado para Transporte',
        },
        {
          text: 'Transportado',
          value: 'Transportado',
        },
        {
          text: 'Entregue',
          value: 'Entregue',
        },
        {
          text: 'Orçamento',
          value: 'Orçamento',
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFilter: (value: any, record: IDataSource) =>
        record.orderStatus.indexOf(value) === 0,
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Data de Entrega',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: '',
      key: 'action',
      render: (text: string, record: IDataSource) => (
        <Space size="middle">
          <AntButton type="link" onClick={() => handleRemoveOrder(record.key)}>
            Deletar
          </AntButton>
          <AntButton type="link" onClick={() => generatePDF(record.key)}>
            Gerar PDF
          </AntButton>
        </Space>
      ),
    },
  ];

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <Typography.Title level={2}>Lista de Pedidos</Typography.Title>
          <Table columns={columns} dataSource={dataSource} />
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default AllOrders;
