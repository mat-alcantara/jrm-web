/* eslint-disable react/jsx-wrap-multilines */
import { Divider, Typography, List, Button } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';
import React, { useCallback, useRef, useState } from 'react';

// import { format } from 'date-fns';

import { useReactToPrint } from 'react-to-print';
import IOrder from 'types/IOrder';
import ICustomer from 'types/ICustomer';
import { useCustomer } from '../../hooks/Customer';
import { useOrder } from '../../hooks/Order';
import {
  Container,
  Footer,
  MainContent,
  Header,
  UpperContainer,
  JRMInfo,
  CodeAndDataInfo,
  LowerContainer,
} from './styles';

interface OrderResumeProps {
  orderId: string;
}

const OrderResume: React.FC<OrderResumeProps> = ({ orderId }) => {
  const listData = [
    {
      key: '1',
      title:
        '2 - MDF BRANCO TX 2 FACES COMUM 15MM - 1080 [ 2 ] x 340 [ 2 ] | R$ 78',
    },
    {
      key: '2',
      title:
        '4 - MDF BRANCO TX 2 FACES COMUM 15MM - 830 [ 2 ] x 310 [ 2 ] | R$ 112',
    },
    {
      key: '3',
      title:
        '6 - MDF BRANCO TX 2 FACES COMUM 15MM - 325 [ 1 ] x 310 [ 0 ] | R$ 60',
    },
    {
      key: '4',
      title:
        '2 - MDF BRANCO TX 2 FACES COMUM 15MM - 265 [ 0 ] x 310 [ 0 ] | R$ 14',
    },
    {
      key: '5',
      title:
        '2 - MDF BRANCO TX 2 FACES COMUM 15MM - 333 [ 0 ] x 265 [ 0 ] | R$ 16',
    },
    {
      key: '6',
      title:
        '1 - MDF BRANCO LOUSA 2 FACES COMUM 2.8MM - 1030 [ 0 ] x 830 [ 0 ] | R$ 42',
    },
  ];

  const { loadOrderFromId } = useOrder();
  const { loadCustomerFromId } = useCustomer();

  const [order, setOrder] = useState<IOrder>();
  const [customer, setCustomer] = useState<ICustomer>();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleLoadData = useCallback(async () => {
    const orderFromHook = await loadOrderFromId(orderId);
    const customerFromHook = await loadCustomerFromId(orderFromHook.customerId);

    setOrder(orderFromHook);
    setCustomer(customerFromHook);

    if (handlePrint) {
      handlePrint();
    }
  }, [order, customer]);

  return (
    <>
      <div style={{ display: 'none' }}>
        <Container
          ref={componentRef}
          style={{ height: listData.length > 16 ? '200vh' : '100vh' }}
        >
          <MainContent>
            <Header>
              <Typography.Title level={3} style={{ marginTop: '0' }}>
                JRM Compensados
              </Typography.Title>
              {order?.orderStatus === 'Orçamento' ? (
                <Typography.Title
                  type="secondary"
                  level={3}
                  style={{ marginTop: '0' }}
                >
                  ORÇAMENTO DE CORTE
                </Typography.Title>
              ) : (
                <Typography.Title
                  type="secondary"
                  level={3}
                  style={{ marginTop: '0' }}
                >
                  PEDIDO DE CORTE
                </Typography.Title>
              )}
            </Header>
            <Divider style={{ margin: '0' }} />
            <UpperContainer>
              <JRMInfo>
                <div
                  style={{
                    marginTop: '0px',
                  }}
                >
                  <Typography.Text>
                    Rua Julieta Conceição Reis 280
                  </Typography.Text>
                  <Typography.Text>Frade, Angra dos Reis - RJ</Typography.Text>
                  <Typography.Text
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FaWhatsapp />
                    (24) 99964-4953
                  </Typography.Text>
                </div>
                <div>
                  <Typography.Text>Endereço da Japuíba, 999</Typography.Text>
                  <Typography.Text>
                    Japuíba, Angra dos Reis - RJ
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FaWhatsapp />
                    (24) 99969-4543
                  </Typography.Text>
                </div>
                <div>
                  <Typography.Text>
                    Email: jrmcompensados@hotmail.com
                  </Typography.Text>
                </div>
              </JRMInfo>
              <CodeAndDataInfo>
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Código do pedido
                  </Typography.Title>
                  <Divider style={{ margin: '0px 0px 4px 0px' }} />
                  <Typography.Text>{`# ${order?.order_code}`}</Typography.Text>
                </div>
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Data do Pedido
                  </Typography.Title>
                  <Divider style={{ margin: '0px 0px 4px 0px' }} />
                  <Typography.Text>21/10/1996</Typography.Text>
                </div>
              </CodeAndDataInfo>
            </UpperContainer>

            <LowerContainer>
              <div>
                <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                  Pedido
                </Typography.Title>
                <Divider style={{ margin: '0px 0px 8px 0px' }} />
                <Typography.Text>{`Loja do Pedido: ${order?.orderStore}`}</Typography.Text>
                <Typography.Text>{`Vendedor: ${order?.seller}`}</Typography.Text>
                {order?.orderStatus !== 'Orçamento' && (
                  <>
                    <Typography.Text>
                      {`Tipo de Entrega: ${order?.delivery_type}`}
                    </Typography.Text>
                    <Typography.Text>
                      {`Status do Pagamento: ${order?.paymentStatus}`}
                    </Typography.Text>
                    {order?.ps && (
                      <Typography.Text>
                        {`Observações: ${order.ps}`}
                      </Typography.Text>
                    )}
                    <Typography.Text style={{ fontWeight: 'bold' }}>
                      {`Prazo: Até ${order?.deliveryDate}`}
                    </Typography.Text>
                  </>
                )}
              </div>
              <div>
                <Typography.Title style={{ marginBottom: '0px' }} level={5}>
                  Cliente
                </Typography.Title>
                <Divider style={{ margin: '0px 0px 8px 0px' }} />
                <Typography.Text>{`Nome: ${customer?.name}`}</Typography.Text>
                {customer?.street !== 'Endereço não informado' && (
                  <Typography.Text>
                    {`Endereço: ${customer?.street}, ${customer?.area}`}
                  </Typography.Text>
                )}

                <Typography.Text>
                  {`Telefone: (${customer?.telephone[0].substring(
                    0,
                    2,
                  )}) ${customer?.telephone[0].substring(
                    2,
                    7,
                  )} - ${customer?.telephone[0].substring(7, 11)}`}
                </Typography.Text>
              </div>
            </LowerContainer>
            <List
              size="small"
              dataSource={listData}
              itemLayout="horizontal"
              footer={
                <div style={{ textAlign: 'right' }}>
                  Total:
                  <strong style={{ marginLeft: '8px' }}>R$ 322,00</strong>
                </div>
              }
              style={{ width: '100%', margin: '24px auto 0px auto' }}
              renderItem={(item) => (
                <List.Item style={{ textAlign: 'left', marginLeft: '0px' }}>
                  <List.Item.Meta
                    title={
                      <Typography style={{ fontSize: '10px' }}>
                        {item.title}
                      </Typography>
                    }
                  />
                </List.Item>
              )}
            />
          </MainContent>
          <Footer>
            <div>
              <Typography.Title level={5} style={{ marginBottom: '32px' }}>
                Assinatura do cliente
              </Typography.Title>
              <Divider
                style={{
                  margin: '0',
                  width: '100%',
                  background: '#1B1E23',
                  height: '1px',
                }}
              />
            </div>
          </Footer>
        </Container>
      </div>
      <Button type="link" onClick={handleLoadData}>
        Comprovante
      </Button>
    </>
  );
};

export default OrderResume;
