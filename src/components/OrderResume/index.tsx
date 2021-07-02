import { Button, Divider, Typography, List } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Logo from '../../assets/logo.svg';

import { Container } from './styles';

const Tags: React.FC = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
        <Container ref={componentRef}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img
              src={Logo}
              alt="Logotipo"
              style={{ width: '150px', height: 'auto', marginBottom: '16px' }}
            />
            <Typography.Title
              type="secondary"
              level={2}
              style={{ marginTop: '0' }}
            >
              PEDIDO DE CORTE #17
            </Typography.Title>
          </div>
          <Divider style={{ margin: '0' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '16px',
                gap: '32px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
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
                    margin: '0 auto',
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
                  textAlign: 'center',
                }}
              >
                <Typography.Text>Endereço da Japuíba, 999</Typography.Text>
                <Typography.Text>Japuíba, Angra dos Reis - RJ</Typography.Text>
                <Typography.Text
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '0 auto',
                  }}
                >
                  <FaWhatsapp />
                  (24) 99969-4543
                </Typography.Text>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '48px',
            }}
          >
            <div
              style={{ width: '48%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography.Title level={5}>Dados</Typography.Title>
              <Divider style={{ margin: '0px 0px 8px 0px' }} />

              <Typography.Text>
                Tipo de Entrega: Retirar na Loja
              </Typography.Text>

              <Typography.Text>Loja do Pedido: Japuíba</Typography.Text>
              <Typography.Text>
                Status do Pagamento: Receber na Entrega
              </Typography.Text>
              <Typography.Text>Prazo: Até 08/07/21</Typography.Text>
              <Typography.Text>Vendedor: Vitória</Typography.Text>
            </div>
            <div
              style={{ width: '48%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography.Title style={{ marginBottom: '8px' }} level={5}>
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
          <List />
        </Container>
      </div>

      <Button type="link" onClick={handlePrint}>
        Resumo do pedido
      </Button>
    </>
  );
};

export default Tags;
