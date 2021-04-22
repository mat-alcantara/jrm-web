import React, { useState, useEffect, useCallback } from 'react';
// import {List} from 'antd';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import { Container } from './styles';

interface ICustomersProps {
  id: string;
  name: string;
  telephone: string;
  email: string;
  street: string;
  area: string;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
}

const CustomersList: React.FC = () => {
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const token = localStorage.getItem('@JRMCompensados:token');

  const getAllCustomersFromApi = useCallback(async () => {
    const allCustomersFromApi = await api.get<ICustomersProps[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllCustomers([...allCustomersFromApi.data]);
  }, [allCustomers]);

  useEffect(() => {
    getAllCustomersFromApi();
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>Lista de clientes</Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CustomersList;
