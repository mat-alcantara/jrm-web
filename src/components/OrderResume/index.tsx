/* eslint-disable react/jsx-wrap-multilines */
import { Divider, Typography, List } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';
import React, { MutableRefObject } from 'react';

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
  componentRef: MutableRefObject<null>;
}

const OrderResume: React.FC<OrderResumeProps> = ({ componentRef }) => {
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
              <Typography.Title
                type="secondary"
                level={3}
                style={{ marginTop: '0' }}
              >
                PEDIDO DE CORTE
              </Typography.Title>
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
              </JRMInfo>
              <CodeAndDataInfo>
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Código do pedido
                  </Typography.Title>
                  <Divider style={{ margin: '0px 0px 4px 0px' }} />
                  <Typography.Text>17</Typography.Text>
                </div>
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Data do Pedido
                  </Typography.Title>
                  <Divider style={{ margin: '0px 0px 4px 0px' }} />
                  <Typography.Text>01/07/2021</Typography.Text>
                </div>
              </CodeAndDataInfo>
            </UpperContainer>

            <LowerContainer>
              <div>
                <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                  Pedido
                </Typography.Title>
                <Divider style={{ margin: '0px 0px 8px 0px' }} />

                <Typography.Text>
                  Tipo de Entrega: Retirar na Loja
                </Typography.Text>

                <Typography.Text>Loja do Pedido: Japuíba</Typography.Text>
                <Typography.Text>
                  Status do Pagamento: Receber na Entrega
                </Typography.Text>
                <Typography.Text>Vendedor: Vitória</Typography.Text>
                {/* <Typography.Text>
                  Observações: Todas estas questões, devidamente ponderadas,
                  levantam dúvidas sobre se a estrutura atual da organização
                  desafia a capacidade de equalização das condições
                  inegavelmente apropriadas.
                </Typography.Text> */}
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Prazo: Até 08/07/21
                </Typography.Text>
              </div>
              <div>
                <Typography.Title style={{ marginBottom: '0px' }} level={5}>
                  Cliente
                </Typography.Title>
                <Divider style={{ margin: '0px 0px 8px 0px' }} />
                <Typography.Text>Nome: Diego Bu</Typography.Text>
                <Typography.Text>
                  Endereço: Endereço não informado, Japuíba
                </Typography.Text>

                <Typography.Text>Telefone: (21) 98660 - 1910</Typography.Text>
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
    </>
  );
};

export default OrderResume;
