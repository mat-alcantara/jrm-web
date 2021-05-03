import React, { useEffect, useCallback, useState } from 'react';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import { Container } from './styles';

interface IOrdersProps {
  customerId: string;
  orderStore: string;
  orderStatus: string;
  order_code: number;
  price: number;
  deliveryDate: string;
}

interface ICustomersProps {
  name: string;
}

const AllOrders: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const [allOrders, setAllOrders] = useState<IOrdersProps[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);

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
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container />
      </AntContent>
    </AntDashboard>
  );
};

export default AllOrders;
