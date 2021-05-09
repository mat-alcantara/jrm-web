import React, { useCallback, useEffect, useState } from 'react';
import { Table, Space, Typography } from 'antd';

import { useCustomer } from '../../hooks/Customer';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

import ICustomer from '../../types/ICustomer';

import { Container } from './styles';

interface ICustomersTableProps {
  key: string;
  name: string;
  telephone: string;
  email: string;
  street: string;
  area: string;
  city: string;
  state: string;
}

const CustomersList: React.FC = () => {
  const { loadCustomers, removeCustomer } = useCustomer();

  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);
  const [customersDataSource, setCustomersDataSource] = useState<
    ICustomersTableProps[]
  >([]);

  // Load allCustomers from hook and set customersData
  useEffect(() => {
    async function loadAllCustomersFromHook() {
      const customersFromHook = await loadCustomers();

      setAllCustomers([...customersFromHook]);
    }

    function setDataSource() {
      allCustomers.forEach((customer) => {
        setCustomersDataSource((prevValue) => [
          ...prevValue,
          {
            key: customer.id,
            name: customer.name,
            email: customer.email,
            street: customer.street,
            area: customer.area,
            city: customer.city,
            state: customer.state,
            telephone: customer.telephone[0],
          },
        ]);
      });
    }

    loadAllCustomersFromHook();
    setDataSource();
  }, []);

  // Use the hook to remove the data from database and remove from customerdData
  const handleRemoveCustomer = useCallback(
    async (id: string) => {
      await removeCustomer(id);

      const customersDataSourceFiltered = customersDataSource.filter(
        (cdata) => cdata.key !== id,
      );

      setCustomersDataSource([...customersDataSourceFiltered]);
    },
    [customersDataSource],
  );

  const tableColumns = [
    {
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Endereço',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Bairro',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'UF',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '',
      key: 'actions',
      render: (record: ICustomersTableProps) => (
        <Space size="small">
          <AntButton
            type="link"
            onClick={() => handleRemoveCustomer(record.key)}
          >
            Remover
          </AntButton>
          <a href="/">Editar</a>
        </Space>
      ),
    },
  ];

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <Typography.Title level={2}>Lista de Clientes</Typography.Title>
          <Table
            dataSource={customersDataSource}
            columns={tableColumns}
            style={{ margin: '32px 0px' }}
          />
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CustomersList;
