import React, { useCallback, useState, useRef } from 'react';
import { Steps, Popconfirm, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useOrder } from '../../hooks/Order';
import { useAuth } from '../../hooks/Auth';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import { Container, StepsContainer } from './styles';

import AntButton from '../../components/AntButton';
import AntInput from '../../components/AntInput';

import CustomerSelection from './CustomerSelection';
import DataPage from './DataPage';
import CutlistPage from './CutlistPage';
import PaymentPage from './PaymentPage';

import ICustomer from '../../types/ICustomer';
import IOrderData from '../../types/IOrderData';
import ICutlist from '../../types/ICutlist';

const NewCutlist: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { createOrder } = useOrder();
  const { user, checkAuth } = useAuth();

  const { Step } = Steps;

  const [page, setPage] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthErrored, setIsAuthErrored] = useState<boolean>(false);

  // CustomerSelection states
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  // DataPage states
  const [orderData, setOrderData] = useState<IOrderData>();

  // CutlistPage states
  const [cutlist, setCutlist] = useState<ICutlist[]>([]);

  const handleSubmitData = useCallback(async () => {
    await createOrder(selectedCustomer, orderData, cutlist);
  }, [selectedCustomer, orderData, cutlist]);

  const handleSubmitAuth = useCallback(
    async (formData) => {
      setIsAuthErrored(false);

      const checkIfAuthIsCorrect = await checkAuth({
        email: user.email,
        password: formData.password,
      });

      if (checkIfAuthIsCorrect) {
        setIsAuthenticated(true);
      } else {
        setIsAuthErrored(true);
      }
    },
    [isAuthenticated],
  );

  if (!isAuthenticated) {
    return (
      <AntDashboard>
        <AntContent>
          <Container>
            <div>
              <Typography.Title level={1} style={{ marginTop: '64px' }}>
                {`Olá, ${user.name}`}
              </Typography.Title>
              <Typography style={{ fontSize: '24px', marginBottom: '16px' }}>
                Digite a sua senha para continuar
              </Typography>
              <Form
                onSubmit={handleSubmitAuth}
                ref={formRef}
                style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                <AntInput
                  name="password"
                  placeholder="Senha"
                  type="password"
                  style={{ textAlign: 'center' }}
                  size="large"
                />
                <AntButton htmlType="submit" type="primary" size="middle" block>
                  Confirmar
                </AntButton>
              </Form>
              {isAuthErrored && (
                <Typography
                  style={{
                    color: 'red',
                    marginTop: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  SENHA INVÁLIDA
                </Typography>
              )}
            </div>
          </Container>
        </AntContent>
      </AntDashboard>
    );
  }

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
            <CutlistPage
              cutlist={cutlist}
              orderData={orderData}
              setCutlist={setCutlist}
            />
          )}
          {page === 4 && (
            <>
              <PaymentPage />
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
