import React, { useCallback, useEffect, useState } from 'react';
import { Table, Space, Typography, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntButton from '../../components/AntButton';

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

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);

  useEffect(() => {
    async function loadDataFromHook() {
      const allCustomersFromHook = await loadCustomers();

      const allOrdersFromHook = await loadOrders();

      const dataToSetDataSource = allOrdersFromHook.map((order) => {
        const customerFound = allCustomersFromHook.find(
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

    loadDataFromHook();
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
          <Popconfirm
            title="Tem certeza de que deseja excluir esse pedido?"
            onConfirm={() => handleRemoveOrder(record.key)}
            okText="Sim"
            cancelText="Não"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <AntButton type="link">Deletar</AntButton>
          </Popconfirm>

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
