import React, { useCallback, useEffect, useState } from 'react';

import { Steps, Spin, Button, Grid } from 'antd';
import { Container, Loading, NavMenu } from './styles';
import AppContainer from '../../components/AppContainer';

import { useCustomer } from '../../hooks/Customer';
import { useOrder } from '../../hooks/Order';
import { useMaterial } from '../../hooks/Material';

import AuthSection from './AuthSection';
import CustomerSection from './CustomerSection';
import CutlistSection from './CutlistSection';
import DataSection from './DataSection';

import ICustomer from '../../types/ICustomer';
import ICutlist from '../../types/ICutlist';
import IOrderData from '../../types/IOrderData';
import IMaterial from '../../types/IMaterial';

import calculateCutlistPrice from '../../utils/calculateCutlistPrice';

const NewCutlist: React.FC = () => {
  const breakpoints = Grid.useBreakpoint();

  //* Hooks
  const { loadCustomers } = useCustomer();
  const { createOrder } = useOrder();
  const { loadMaterials } = useMaterial();

  //* States
  // General Data
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);
  const [allMaterials, setAllMaterials] = useState<IMaterial[]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBase, setPriceBase] = useState<number>(75);

  // Select Customer Section Data
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // Cutlist Section Data
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  useEffect(() => {
    async function loadCustomersFromApi() {
      const customersFromHook = await loadCustomers();
      setAllCustomers((prevValue) => [...prevValue, ...customersFromHook]);
    }

    async function loadMaterialsFromApi() {
      const allMaterialsFromHook = await loadMaterials();

      setAllMaterials([...allMaterialsFromHook]);
    }

    // Load stored customer
    const customerFromLocalStorage = localStorage.getItem(
      '@JRMCompensados:customerSelected',
    );

    if (customerFromLocalStorage) {
      setSelectedCustomer(JSON.parse(customerFromLocalStorage));
    }

    // Load stored cutlist
    const cutlistFromLocalStorage = localStorage.getItem(
      '@JRMCompensados:cutlist',
    );

    if (cutlistFromLocalStorage) {
      const parsedCutlist: ICutlist[] = JSON.parse(cutlistFromLocalStorage);

      parsedCutlist.forEach((cut) =>
        setTotalPrice((prevValue) => prevValue + cut.price),
      );

      setCutlist(parsedCutlist);
    }

    // Load stored discount
    const priceBaseFromLocalStorage = localStorage.getItem(
      '@JRMCompensados:selectedPriceBase',
    );

    if (priceBaseFromLocalStorage) {
      setPriceBase(JSON.parse(priceBaseFromLocalStorage));
    }

    loadCustomersFromApi();
    loadMaterialsFromApi();
    setLoading(false);
  }, []);

  const handleUpdatePrice = useCallback(
    (newPrice) => {
      setTotalPrice((prevValue) => prevValue + newPrice);
    },
    [totalPrice],
  );

  const handleClearLocalStorage = useCallback(() => {
    localStorage.removeItem('@JRMCompensados:cutlist');
    localStorage.removeItem('@JRMCompensados:customerSelected');
    localStorage.removeItem('@JRMCompensados:selectedPriceBase');
  }, []);

  const handleUpdateOrderData = useCallback(
    async (orderDataFromSection: IOrderData) => {
      await createOrder(selectedCustomer, orderDataFromSection, cutlist);

      handleClearLocalStorage();
    },
    [cutlist, selectedCustomer],
  );

  const handleAppyDiscount = useCallback(
    (updatedPriceBase: number) => {
      let priceSum = 0;

      const cutlistWithPriceUpdated = cutlist.map((cut) => {
        const materialUsed = allMaterials.find(
          (material) => material.id === cut.material_id,
        );

        if (materialUsed) {
          // eslint-disable-next-line no-param-reassign
          cut.price = calculateCutlistPrice(
            materialUsed,
            {
              quantidade: cut.quantidade,
              side_a_border: cut.side_a_border,
              side_a_size: cut.side_a_size,
              side_b_border: cut.side_b_border,
              side_b_size: cut.side_b_size,
            },
            updatedPriceBase,
          );
        }

        priceSum += cut.price;

        return cut;
      });

      setPriceBase(updatedPriceBase);
      setTotalPrice(priceSum);

      localStorage.setItem(
        '@JRMCompensados:selectedPriceBase',
        JSON.stringify(updatedPriceBase),
      );

      localStorage.setItem(
        '@JRMCompensados:cutlist',
        JSON.stringify(cutlistWithPriceUpdated),
      );
    },
    [priceBase, totalPrice, cutlist, allMaterials],
  );

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
    return (
      <AppContainer>
        <AuthSection setIsAuthenticated={setIsAuthenticated} />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Container>
        {page === 1 && (
          <CustomerSection
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            allCustomers={allCustomers}
          />
        )}
        {page === 2 && (
          <CutlistSection
            priceBase={priceBase}
            cutlist={cutlist}
            setCutlist={setCutlist}
            totalPrice={totalPrice}
            handleUpdatePrice={handleUpdatePrice}
            allMaterials={allMaterials}
          />
        )}
        {page === 3 && (
          <DataSection
            priceBase={priceBase}
            selectedCustomer={selectedCustomer}
            handleUpdateOrderData={handleUpdateOrderData}
            totalPrice={totalPrice}
            handleAppyDiscount={handleAppyDiscount}
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

          <Steps
            current={page - 1}
            responsive
            style={{
              margin: '0 auto',
              textAlign: breakpoints.sm ? 'left' : 'center',
            }}
          >
            <Steps.Step title="Dados do cliente" />
            <Steps.Step title="Lista de Cortes" />
            <Steps.Step title="Dados do Pedido" />
          </Steps>
        </NavMenu>
      </Container>
    </AppContainer>
  );
};

export default NewCutlist;
