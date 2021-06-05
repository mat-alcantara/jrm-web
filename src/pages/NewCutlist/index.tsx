import React, { useEffect, useState } from 'react';

import { Steps, Spin, Button } from 'antd';
import { Container, Loading, NavMenu } from './styles';

import { useCustomer } from '../../hooks/Customer';

import AuthSection from './AuthSection';
import CustomerSection from './CustomerSection';
import CutlistSection from './CutlistSection';
import DataSection from './DataSection';

import ICustomer from '../../types/ICustomer';
import ICutlist from '../../types/ICutlist';
import IOrderData from '../../types/IOrderData';

const NewCutlist: React.FC = () => {
  //* Hooks
  const { loadCustomers } = useCustomer();

  //* States
  // General Data
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  // Select Customer Section Data
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // Cutlist Section Data
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  // Data Section
  const [orderData, setOrderData] = useState<IOrderData>();

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
      {page === 1 && (
        <CustomerSection
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          allCustomers={allCustomers}
        />
      )}
      {page === 2 && (
        <CutlistSection cutlist={cutlist} setCutlist={setCutlist} />
      )}
      {page === 3 && (
        <DataSection
          selectedCustomer={selectedCustomer}
          cutlist={cutlist}
          setCutlist={setCutlist}
          setPage={setPage}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      )}
      <NavMenu>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
            marginBottom: '32px',
            margin: '0 auto 32px auto',
          }}
        >
          <Button
            disabled={page < 2}
            type="default"
            style={{
              width: page === 3 ? '50%' : '100%',
              marginRight: page === 3 ? 'auto' : '8px',
            }}
            onClick={() => setPage(page - 1)}
          >
            Retornar
          </Button>
          <Button
            disabled={
              (page === 1 && !selectedCustomer) ||
              (page === 2 && cutlist.length === 0)
            }
            type="default"
            style={{
              width: '100%',
              marginLeft: '8px',
              display: page === 3 ? 'none' : '',
            }}
            onClick={() => setPage(page + 1)}
          >
            Avançar
          </Button>
        </div>

        <Steps current={page - 1}>
          <Steps.Step title="Dados do cliente" />
          <Steps.Step title="Lista de Cortes" />
          <Steps.Step title="Dados do Pedido" />
        </Steps>
      </NavMenu>
    </Container>
  );
};

export default NewCutlist;
