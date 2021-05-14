import React, { useCallback, useEffect, useState } from 'react';
import { Typography, AutoComplete } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { useCustomer } from '../../../hooks/Customer';

import {
  CustomerPageContainer,
  CustomerAutocompleteAndButton,
  CustomerPageData,
} from './styles';

import AntButton from '../../../components/AntButton';

import ICustomer from '../../../types/ICustomer';

interface ICustomerSelectionProps {
  selectedCustomer: ICustomer | undefined;
  setPage(page: number): void;
  setSelectedCustomer(customerData: ICustomer): void;
}

const CustomerSelection: React.FC<ICustomerSelectionProps> = ({
  selectedCustomer,
  setPage,
  setSelectedCustomer,
}) => {
  const { loadCustomers } = useCustomer();

  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);

  useEffect(() => {
    async function loadCustomersFromHook() {
      const customersFromHook = await loadCustomers();

      const allOptions = customersFromHook.map((customer) => {
        return { value: customer.name, id: customer.id };
      });

      setAllCustomers((prevValue) => [...prevValue, ...customersFromHook]);
      setAutoCompleteOptions([...allOptions]);
    }

    loadCustomersFromHook();
  }, []);

  const handleSelectedCustomer = useCallback(
    (value: string, option) => {
      const customerSelectedByAutocomplete = allCustomers.find(
        (customer) => customer.id === option.id,
      );

      if (customerSelectedByAutocomplete) {
        setSelectedCustomer(customerSelectedByAutocomplete);
      }
    },
    [selectedCustomer, allCustomers],
  );

  return (
    <CustomerPageContainer>
      <Typography.Title level={2}>Selecione um cliente</Typography.Title>
      <CustomerAutocompleteAndButton>
        <AutoComplete
          placeholder="Digite o nome de um cliente"
          options={autoCompleteOptions}
          onSelect={handleSelectedCustomer}
          size="large"
        />
        <AntButton
          type="default"
          disabled={!selectedCustomer}
          onClick={() => setPage(2)}
        >
          Próximo
        </AntButton>
      </CustomerAutocompleteAndButton>
      {selectedCustomer && (
        <CustomerPageData>
          <CheckCircleOutlined style={{ color: 'green' }} />
          <Typography.Title level={4}>{selectedCustomer.name}</Typography.Title>
          <Typography>
            {`${selectedCustomer.street}, ${selectedCustomer.area} - ${selectedCustomer.city}`}
          </Typography>
        </CustomerPageData>
      )}
    </CustomerPageContainer>
  );
};

export default CustomerSelection;
