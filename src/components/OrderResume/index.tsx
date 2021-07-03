/* eslint-disable react/jsx-wrap-multilines */
import { Button, Divider, Typography, List } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Container } from './styles';

const Tags: React.FC = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const listData = [
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
    {
      key: '1',
      title:
        '1 - MDF BRANCO TX 2 FACES COMUM 15MM - 600 [2] x 500 [2] - R$ 30,00',
    },
  ];

  return (
    <>
      <div>
        <Container
          ref={componentRef}
          style={{ height: listData.length > 16 ? '200vh' : '100vh' }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* <img
              src={Logo}
              alt="Logotipo"
              style={{ width: '150px', height: 'auto', marginBottom: '16px' }}
            /> */}
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
            </div>
            <Divider style={{ margin: '0' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                fontSize: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
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
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '8px',
                  gap: '8px',
                  textAlign: 'center',
                  fontSize: '16px',
                }}
              >
                <div>
                  <Typography.Title level={5} style={{ marginBottom: '0px' }}>
                    Número do pedido
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
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '16px',
              }}
            >
              <div
                style={{
                  width: '48%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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
                <Typography.Text>
                  Observações: Todas estas questões, devidamente ponderadas,
                  levantam dúvidas sobre se a estrutura atual da organização
                  desafia a capacidade de equalização das condições
                  inegavelmente apropriadas.
                </Typography.Text>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Prazo: Até 08/07/21
                </Typography.Text>
              </div>
              <div
                style={{
                  width: '48%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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
            </div>
            <List
              size="small"
              dataSource={listData}
              itemLayout="horizontal"
              footer={<div style={{ textAlign: 'right' }}>Total: R$ 50,00</div>}
              style={{ width: '100%', margin: '24px auto 0px auto' }}
              renderItem={(item) => (
                <List.Item style={{ textAlign: 'left' }}>
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
          </div>
          <div>
            <div style={{ width: '60%' }}>
              <Typography.Title level={5} style={{ marginBottom: '32px' }}>
                Assinatura do cliente
              </Typography.Title>
              <Divider
                style={{ margin: '0', width: '100%', background: 'black' }}
              />
            </div>
          </div>
        </Container>
      </div>

      <Button type="link" onClick={handlePrint}>
        Resumo do pedido
      </Button>
    </>
  );
};

export default Tags;
