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
  const { allCustomers } = useCustomer();

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);

  useEffect(() => {
    const allOptions = allCustomers.map((customer) => {
      return { value: customer.name, id: customer.id };
    });

    setAutoCompleteOptions([...allOptions]);
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
    [selectedCustomer],
  );

  return (
    <CustomerPageContainer>
      <Typography.Title level={2}>Selecione um cliente</Typography.Title>
      <CustomerAutocompleteAndButton>
        <AutoComplete
          placeholder="Digite o nome de um cliente"
          options={autoCompleteOptions}
          onSelect={handleSelectedCustomer}
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
