import React, { useCallback, useState } from 'react';
import { Steps, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useOrder } from '../../hooks/Order';

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
  const { createOrder } = useOrder();

  const { Step } = Steps;

  const [page, setPage] = useState<number>(1);

  // CustomerSelection states
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // DataPage states
  const [orderData, setOrderData] = useState<IOrderData>();

  // CutlistPage states
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  const handleSubmitData = useCallback(async () => {
    await createOrder(selectedCustomer, orderData, cutlist);
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
              selectedCustomer={selectedCustomer}
            />
          )}
          {page === 3 && (
            <>
              <CutlistPage
                cutlist={cutlist}
                orderData={orderData}
                setCutlist={setCutlist}
              />
              <Popconfirm
                title="Tem certeza de que deseja concluir o pedido?"
                onConfirm={() => handleSubmitData()}
                okText="Sim"
                cancelText="Não"
                icon={<ExclamationCircleOutlined style={{ color: 'green' }} />}
              >
                <AntButton
                  block
                  type="primary"
                  size="large"
                  style={{ maxWidth: '1000px' }}
                  disabled={cutlist.length === 0}
                >
                  Confirmar pedido
                </AntButton>
              </Popconfirm>
            </>
          )}
          <StepsContainer style={{ marginTop: '32px' }}>
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
