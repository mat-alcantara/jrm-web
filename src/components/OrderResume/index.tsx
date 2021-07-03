/* eslint-disable react/jsx-wrap-multilines */
import { Divider, Typography, List, Button } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';
import React, { useCallback, useRef, useState } from 'react';

import { format } from 'date-fns';

import { useReactToPrint } from 'react-to-print';
import IOrder from 'types/IOrder';
import ICustomer from 'types/ICustomer';
import { useCustomer } from '../../hooks/Customer';
import { useOrder } from '../../hooks/Order';
import { useMaterial } from '../../hooks/Material';
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
  const { loadOrderFromId } = useOrder();
  const { loadCustomerFromId } = useCustomer();
  const { loadMaterials } = useMaterial();

  const [order, setOrder] = useState<IOrder>();
  const [customer, setCustomer] = useState<ICustomer>();
  const [listData, setListData] = useState<{ key: string; title: string }[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleLoadData = useCallback(async () => {
    if (!order && !customer) {
      const orderFromHook = await loadOrderFromId(orderId);
      const customerFromHook = await loadCustomerFromId(
        orderFromHook.customerId,
      );
      const allMaterials = await loadMaterials();

      const listDataFromOrders: { key: string; title: string }[] = [];
      let totalPriceFromOrders = 0;

      orderFromHook.cutlist.forEach((cut) => {
        const materialUsed = allMaterials.find(
          (material) => material.id === cut.material_id,
        );

        listDataFromOrders.push({
          key: cut.id,
          title: `${cut.quantidade} - ${
            materialUsed?.name || 'Material Removido'
          } - ${cut.side_a_size} [ ${cut.side_a_border} ] x ${
            cut.side_b_size
          } [ ${cut.side_b_border} ] | R$ ${cut.price},00`,
        });

        totalPriceFromOrders += cut.price;
      });

      setTotalPrice(totalPriceFromOrders);
      setListData(listDataFromOrders);
      setOrder(orderFromHook);
      setCustomer(customerFromHook);
    }

    if (handlePrint) {
      handlePrint();
    }
  }, [order, customer, totalPrice, listData]);

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
                  <Typography.Text>{order?.order_code}</Typography.Text>
                </div>
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Data do Pedido
                  </Typography.Title>
                  <Divider style={{ margin: '0px 0px 4px 0px' }} />
                  <Typography.Text>
                    {order?.created_at &&
                      `${format(new Date(order.created_at), 'dd/MM/yyyy')}`}
                  </Typography.Text>
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
                  <strong style={{ marginLeft: '8px' }}>
                    {`R$ ${totalPrice},00`}
                  </strong>
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
