import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Space, Typography, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AppContainer from '../../components/AppContainer';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

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

interface IOrdersParams {
  type: string;
}

const AllOrders: React.FC = () => {
  const {
    loadOrders,
    removeOrder,
    generatePDF,
    updateOrderStatus,
  } = useOrder();
  const { loadCustomers } = useCustomer();
  const { type } = useParams<IOrdersParams>();

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);

  useEffect(() => {
    let ordersFilter: string | null;

    switch (type) {
      case 'producao':
        ordersFilter = 'Em Produção';
        break;
      case 'liberado-para-transporte':
        ordersFilter = 'Liberado para Transporte';
        break;
      case 'transportado':
        ordersFilter = 'Transportado';
        break;
      case 'entregue':
        ordersFilter = 'Entregue';
        break;
      case 'orcamento':
        ordersFilter = 'Orçamento';
        break;
      default:
        ordersFilter = null;
    }

    async function loadDataFromHook() {
      const allCustomersFromHook = await loadCustomers();

      const allOrdersFromHook = await loadOrders();

      // Filter orders with query param
      const filteredOrdersFromHook = allOrdersFromHook.filter(
        (order) => order.orderStatus === ordersFilter,
      );

      const dataToSetDataSource = filteredOrdersFromHook.map((order) => {
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

  const handleUpdateOrderStatus = useCallback(
    async (id: string, orderStatus: string) => {
      let orderUpdated: string;

      switch (orderStatus) {
        case 'Orçamento':
          orderUpdated = 'Em Produção';
          break;
        case 'Em Produção':
          orderUpdated = 'Liberado para Transporte';
          break;
        case 'Liberado para Transporte':
          orderUpdated = 'Transportado';
          break;
        case 'Transportado':
          orderUpdated = 'Entregue';
          break;
        case 'Entregue':
          orderUpdated = 'Em Produção';
          break;
        default:
          orderUpdated = 'Em Produção';
      }

      await updateOrderStatus(id, orderUpdated);

      window.location.reload();
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
      // filteredValue: [orderSort],
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // onFilter: (value: any, record: IDataSource) =>
      //   record.orderStatus.indexOf(value) === 0,
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
      render: (text: string, record: IDataSource) => {
        let buttonMessage;

        switch (record.orderStatus) {
          case 'Orçamento':
            buttonMessage = 'Produzir';
            break;
          case 'Em Produção':
            buttonMessage = 'Liberar para Transporte';
            break;
          case 'Liberado para Transporte':
            buttonMessage = 'Transportado';
            break;
          case 'Transportado':
            buttonMessage = 'Entregue';
            break;
          case 'Entregue':
            buttonMessage = 'Retornar para Produção';
            break;
          default:
            buttonMessage = null;
        }

        return (
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
            {buttonMessage && (
              <Popconfirm
                title="Atualizar o status do pedido?"
                onConfirm={() =>
                  handleUpdateOrderStatus(record.key, record.orderStatus)
                }
                okText="Sim"
                cancelText="Não"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <AntButton type="primary" style={{ width: '200px' }}>
                  {buttonMessage}
                </AntButton>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <AppContainer>
      <Container>
        <Typography.Title level={3}>Lista de Pedidos</Typography.Title>
        {/* <Space style={{ marginBottom: 16, marginTop: 16 }}>
          <Button onClick={() => setOrderSort('')}>Todos os pedidos</Button>
          <Button onClick={() => setOrderSort('Em Produção')}>
            Em produção
          </Button>
          <Button onClick={() => setOrderSort('Liberado para Transporte')}>
            Liberados para transporte
          </Button>
          <Button onClick={() => setOrderSort('Transportado')}>
            Transportados
          </Button>
          <Button onClick={() => setOrderSort('Entregue')}>Entregues</Button>
          <Button onClick={() => setOrderSort('Orçamento')}>Orçamentos</Button>
        </Space> */}
        <Table columns={columns} dataSource={dataSource} />
      </Container>
    </AppContainer>
  );
};

export default AllOrders;
