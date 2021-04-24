import React, { useCallback, useState } from 'react';
import { List } from 'antd';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

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

interface ICustomersData {
  id: string;
  title: string;
  description: string;
}

const CustomersList: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const [customersData, setCustomersData] = useState<ICustomersData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allCustomers] = useState<Promise<ICustomersProps[]>>(async () => {
    const allCustomersFromApi = await api.get<ICustomersProps[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    await allCustomersFromApi.data.forEach((customer) => {
      setCustomersData((prevValue) => [
        ...prevValue,
        {
          id: customer.id,
          title: customer.name,
          description: `${
            customer.street.charAt(0).toUpperCase() + customer.street.slice(1)
          }, ${
            customer.area.charAt(0).toUpperCase() + customer.area.slice(1)
          } - ${customer.city.charAt(0).toUpperCase() + customer.city.slice(1)}
          `,
        },
      ]);
    });

    return allCustomersFromApi.data;
  });

  const handleRemoveCustomer = useCallback(
    async (id: string) => {
      await api.delete('/customers', {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          id,
        },
      });

      setCustomersData(() => {
        return customersData.filter((customer) => customer.id !== id);
      });
    },
    [customersData],
  );

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {customersData && (
            <List
              style={{ maxWidth: '600px', margin: '0 auto' }}
              itemLayout="horizontal"
              dataSource={customersData}
              renderItem={(customer) => (
                <List.Item
                  actions={[
                    <AntButton
                      block
                      type="link"
                      onClick={() => handleRemoveCustomer(customer.id)}
                    >
                      Excluir
                    </AntButton>,
                  ]}
                >
                  <List.Item.Meta
                    title={customer.title}
                    description={customer.description}
                  />
                </List.Item>
              )}
            />
          )}
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CustomersList;