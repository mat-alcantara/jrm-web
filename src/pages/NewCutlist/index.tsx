import React, { useEffect, useState } from 'react';

import { Divider, Spin } from 'antd';
import { Container, Loading } from './styles';

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
  // General Data
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
    setLoading(false);
  }, []);

  // Loading page while not load data from API
  if (loading) {
    return (
      <Loading>
        <Spin />
      </Loading>
    );
  }

  // Require authentication to return new cutlist page
  if (!isAuthenticated) {
    return <AuthSection setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <Container>
      <CustomerSection
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        allCustomers={allCustomers}
      />
      <Divider />
      {selectedCustomer && (
        <CutlistSection cutlist={cutlist} setCutlist={setCutlist} />
      )}
    </Container>
  );
};

export default NewCutlist;
