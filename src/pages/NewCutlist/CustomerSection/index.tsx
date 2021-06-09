import React, { useCallback, useEffect, useState } from 'react';
import { Typography, AutoComplete, Grid } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import {
  CustomerPageContainer,
  CustomerAutocompleteAndButton,
  CustomerPageData,
} from './styles';

import AntButton from '../../../components/AntButton';

import ICustomer from '../../../types/ICustomer';

interface ICustomerSelectionProps {
  selectedCustomer: ICustomer | undefined;
  setSelectedCustomer(customerData: ICustomer): void;
  allCustomers: ICustomer[];
}

const CustomerSelection: React.FC<ICustomerSelectionProps> = ({
  selectedCustomer,
  setSelectedCustomer,
  allCustomers,
}) => {
  const breakpoints = Grid.useBreakpoint();

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);
  const [searchedOptions, setSearchedOptions] = useState<
    { value: string; id: string }[]
  >([]);

  useEffect(() => {
    async function loadAutoCompleteOptions() {
      const allOptions = allCustomers.map((customer) => {
        return { value: customer.name, id: customer.id };
      });
      setAutoCompleteOptions([...allOptions]);
    }

    loadAutoCompleteOptions();
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

  const onSearchProduct = useCallback(
    (searchValue: string) => {
      const allAutoCompleteResults = autoCompleteOptions.filter((option) => {
        const splittedValue = searchValue.split(' ');

        // Check if string contain all items from array of substrings
        return splittedValue.every((subs) =>
          option.value.toLocaleLowerCase().includes(subs.toLocaleLowerCase()),
        )
          ? option
          : '';
      });

      setSearchedOptions(!searchValue ? [] : [...allAutoCompleteResults]);
    },
    [autoCompleteOptions, searchedOptions],
  );

  return (
    <CustomerPageContainer>
      <Typography.Title
        level={breakpoints.sm ? 3 : 4}
        style={{ marginBottom: '32px' }}
      >
        Selecione um cliente
      </Typography.Title>
      <CustomerAutocompleteAndButton>
        <AutoComplete
          placeholder="Digite o nome de um cliente"
          options={searchedOptions}
          onSelect={handleSelectedCustomer}
          size="middle"
          onSearch={onSearchProduct}
        />
      </CustomerAutocompleteAndButton>
      <AntButton size="large" type="link" style={{ marginTop: '16px' }}>
        <Link to="/newcustomer">Criar um novo cliente</Link>
      </AntButton>

      {selectedCustomer && (
        <CustomerPageData>
          <CheckCircleOutlined style={{ color: 'green' }} />
          <Typography.Title level={4}>{selectedCustomer.name}</Typography.Title>
          <Typography style={{ width: breakpoints.sm ? '' : '350px' }}>
            {`${selectedCustomer.street}, ${selectedCustomer.area} - ${selectedCustomer.city}`}
          </Typography>
        </CustomerPageData>
      )}
    </CustomerPageContainer>
  );
};

export default CustomerSelection;