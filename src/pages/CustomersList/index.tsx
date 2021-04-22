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

interface ICustomersNamesForList {
  title: string;
}

const CustomersList: React.FC = () => {
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const [customersNamesForList, setCustomersNamesForList] = useState<
    ICustomersNamesForList[]
  >([]);

  const token = localStorage.getItem('@JRMCompensados:token');

  const getAllCustomersFromApi = useCallback(async () => {
    const allCustomersFromApi = await api.get<ICustomersProps[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllCustomers([...allCustomersFromApi.data]);
  }, [allCustomers]);

  const createCustomersNamesToUseInList = useCallback(() => {
    allCustomers.forEach((customer) => {
      setCustomersNamesForList((prevValue) => [
        ...prevValue,
        { title: customer.name },
      ]);
    });
  }, [customersNamesForList]);

  useEffect(() => {
    getAllCustomersFromApi();
    createCustomersNamesToUseInList();
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {allCustomers.map((customer) => (
            <div key={customer.id}>
              <h1>{customer.name}</h1>
            </div>
          ))}
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CustomersList;
