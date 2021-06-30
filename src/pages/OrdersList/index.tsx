import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Space, Typography, Popconfirm, Input } from 'antd';
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
    updateDeliveryDate,
  } = useOrder();
  const { loadCustomers } = useCustomer();
  const { type } = useParams<IOrdersParams>();

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [tableDataSource, setTableDataSource] = useState<IDataSource[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [orderSearch, setOrderSearch] = useState<string>('');

  const handleUpdateTableDataSource = useCallback(() => {
    const filteredDataSource = dataSource.filter((data) => {
      const splittedSearchValue = orderSearch.split(' ');

      return splittedSearchValue.every(
        (subs) =>
          data.order_code
            .toString()
            .toLocaleLowerCase()
            .includes(subs.toLocaleLowerCase()) ||
          data.customerName
            .toLocaleLowerCase()
            .includes(subs.toLocaleLowerCase()),
      );
    });

    setTableDataSource([
      ...filteredDataSource.sort((a, b) => a.order_code - b.order_code),
    ]);
  }, [tableDataSource, dataSource, orderSearch]);

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
      case 'todas':
        ordersFilter = '';
        break;
      default:
        ordersFilter = null;
    }

    setPageTitle(
      ordersFilter === ''
        ? 'Lista de Pedidos'
        : `Lista de Pedidos - ${ordersFilter}`,
    );

    async function loadDataFromHook() {
      const allCustomersFromHook = await loadCustomers();

      const allOrdersFromHook = await loadOrders();

      // Filter orders with query param
      const filteredOrdersFromHook = allOrdersFromHook.filter((order) => {
        if (ordersFilter !== '') {
          return order.orderStatus === ordersFilter;
        }
        return order;
      });

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
      setTableDataSource([
        ...dataToSetDataSource.sort((a, b) => a.order_code - b.order_code),
      ]);
    }

    loadDataFromHook();
    handleUpdateTableDataSource();
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
          orderUpdated = 'Entregue';
          break;

        case 'Entregue':
          orderUpdated = 'Em Produção';
          break;
        default:
          orderUpdated = 'Em Produção';
      }

      if (orderStatus === 'Orçamento') {
        await updateDeliveryDate(id);
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
            buttonMessage = 'Enviar para produção';
            break;
          case 'Em Produção':
            buttonMessage = 'Concluir etapa';
            break;
          case 'Liberado para Transporte':
            buttonMessage = 'Concluir etapa';
            break;
          case 'Transportado':
            buttonMessage = 'Concluir etapa';
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
        <Typography.Title level={3}>{pageTitle}</Typography.Title>
        <Input.Search
          placeholder="Digite o código ou nome do cliente"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          onSearch={() => handleUpdateTableDataSource()}
          style={{
            maxWidth: '400px',
            margin: '32px auto',
            textAlign: 'center',
          }}
        />
        <Table columns={columns} dataSource={tableDataSource} />
      </Container>
    </AppContainer>
  );
};

export default AllOrders;
