import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Table, Space } from 'antd';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntButton from '../../components/AntButton';

import { Container } from './styles';

interface IOrdersProps {
  id: string;
  customerId: string;
  orderStore: string;
  orderStatus: string;
  order_code: number;
  price: number;
  deliveryDate: string;
}

interface ICustomersProps {
  id: string;
  name: string;
}

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
  const token = localStorage.getItem('@JRMCompensados:token');

  const [allOrders, setAllOrders] = useState<IOrdersProps[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const firstUpdate = useRef(false);

  const loadDataSource = useCallback(() => {
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
        customerName: customerFound?.name || 'Cliente removido',
      };
    });

    setDataSource((prevVal) => [...prevVal, ...dataToSetDataSource]);
  }, []);

  const handleRemoveOrder = useCallback(async (id) => {
    await api.delete(`/orders/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllOrders((prevVal) => prevVal.filter((val) => val.id !== id));
  }, []);

  const openPDF = useCallback(async (id) => {
    const PDFCreatedInBlob = await api.post(
      `/orderpdf/${id}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
        responseType: 'blob',
      },
    );

    const file = new Blob([PDFCreatedInBlob.data], {
      type: 'application/pdf',
    });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);
  }, []);

  useEffect(() => {
    if (
      firstUpdate.current &&
      allCustomers.length > 0 &&
      allOrders.length > 0
    ) {
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
          customerName: customerFound?.name || 'Cliente removido',
        };
      });

      setDataSource([...dataToSetDataSource]);
    } else {
      firstUpdate.current = true;
    }
  }, [allCustomers, allOrders]);

  useEffect(() => {
    async function loadOrders() {
      const allOrdersReturnedByAPI = await api.get<IOrdersProps[]>('/orders', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const allCustomersReturnedByAPI = await api.get<ICustomersProps[]>(
        '/customers',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      setAllOrders([...allOrdersReturnedByAPI.data]);
      setAllCustomers([...allCustomersReturnedByAPI.data]);
    }

    loadOrders();
    loadDataSource();
  }, []);

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
      render: (text: string, record: IDataSource) => (
        <Space size="middle">
          <AntButton type="link" onClick={() => handleRemoveOrder(record.key)}>
            Delete
          </AntButton>
          <AntButton type="link" onClick={() => openPDF(record.key)}>
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
          <h1>Lista de Pedidos</h1>
          <Table columns={columns} dataSource={dataSource} />
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default AllOrders;
