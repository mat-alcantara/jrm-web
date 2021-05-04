import React, { useCallback, useEffect, useState } from 'react';
import { List } from 'antd';

import { useCustomer } from '../../hooks/Customer';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

import { Container } from './styles';

interface ICustomersDataSource {
  id: string;
  title: string;
  description: string;
}

const CustomersList: React.FC = () => {
  const { allCustomers, removeCustomer } = useCustomer();

  const [customersData, setCustomersData] = useState<ICustomersDataSource[]>(
    [],
  );

  // Load allCustomers from hook and set customersData
  useEffect(() => {
    allCustomers.forEach((customer) => {
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
  }, []);

  // Use the hook to remove the data from database and remove from customerdData
  const handleRemoveCustomer = useCallback(
    (id: string) => {
      removeCustomer(id);

      const customersDataFiltered = customersData.filter(
        (cdata) => cdata.id !== id,
      );

      setCustomersData([...customersDataFiltered]);
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
