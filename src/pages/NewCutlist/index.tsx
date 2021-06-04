import React, { useEffect, useState } from 'react';

import { Divider } from 'antd';
import { Container } from './styles';

import { useCustomer } from '../../hooks/Customer';

import AuthSection from './AuthSection';
import CustomerSection from './CustomerSection';
import CutlistSection from './CutlistSection';

import ICustomer from '../../types/ICustomer';
import ICutlist from '../../types/ICutlist';

const NewCutlist: React.FC = () => {
  //* Hooks
  const { loadCustomers } = useCustomer();

  //* States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // General Data
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  // Select Customer Section Data
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // Cutlist Section Data
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  // Data Section

  useEffect(() => {
    async function loadCustomersFromApi() {
      const customersFromHook = await loadCustomers();
      setAllCustomers((prevValue) => [...prevValue, ...customersFromHook]);
    }

    loadCustomersFromApi();
  });

  // Require authentication to return new cutlist page
  if (!isAuthenticated) {
    return <AuthSection setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <Container>
      <CustomerSection
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
      <Divider />
      {selectedCustomer && (
        <CutlistSection cutlist={cutlist} setCutlist={setCutlist} />
      )}
    </Container>
  );
};

export default NewCutlist;
