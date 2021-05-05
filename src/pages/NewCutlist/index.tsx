import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Steps } from 'antd';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import { Container, StepsContainer } from './styles';

import AntButton from '../../components/AntButton';

import CustomerSelection from './CustomerSelection';
import DataPage from './DataPage';
import CutlistPage from './CutlistPage';

import ICustomer from '../../types/ICustomer';
import IOrderData from '../../types/IOrderData';
import ICutlist from '../../types/ICutlist';

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');
  const history = useHistory();

  const { Step } = Steps;

  const [page, setPage] = useState<number>(1);

  // CustomerSelection states
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // DataPage states
  const [orderData, setOrderData] = useState<IOrderData>();

  // CutlistPage states
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  const handleSubmitData = useCallback(async () => {
    const orderPostData = {
      customerId: selectedCustomer?.id,
      cutlist,
      orderStore: orderData?.orderStore,
      orderStatus: orderData?.orderStatus,
      paymentStatus: orderData?.paymentStatus,
      ps: orderData?.ps,
      seller: orderData?.seller,
    };

    const orderCreated = await api.post('/orders', orderPostData, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const PDFCreatedInBlob = await api.post(
      `/orderpdf/${orderCreated.data.id}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
        responseType: 'blob',
      },
    );

    const file = new Blob([PDFCreatedInBlob.data], {
      type: 'application/pdf',
    });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);

    history.push('/allorders');
  }, [selectedCustomer, orderData, cutlist]);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {page === 1 && (
            <CustomerSelection
              setPage={setPage}
              setSelectedCustomer={setSelectedCustomer}
              selectedCustomer={selectedCustomer}
            />
          )}
          {page === 2 && (
            <DataPage
              orderData={orderData}
              page={page}
              setOrderData={setOrderData}
              setPage={setPage}
            />
          )}
          {page === 3 && (
            <>
              <CutlistPage
                cutlist={cutlist}
                orderData={orderData}
                setCutlist={setCutlist}
              />
              <AntButton
                block
                type="primary"
                size="large"
                onClick={() => handleSubmitData()}
                style={{ maxWidth: '1000px' }}
                disabled={cutlist.length === 0}
              >
                Confirmar pedido
              </AntButton>
            </>
          )}
          <StepsContainer>
            <Steps current={page - 1}>
              <Step title="Cliente" description="Selecione um cliente" />
              <Step title="Dados" description="Forneça os dados do pedido" />
              <Step title="Peças" description="Forneça a lista de peças" />
            </Steps>
          </StepsContainer>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;
