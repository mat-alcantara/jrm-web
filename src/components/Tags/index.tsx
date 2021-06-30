import { Button, Divider, Typography } from 'antd';
import { FiSquare } from 'react-icons/fi';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// import { sortCutlistData } from '../../utils/sortCutlistData';

import G0P0 from '../../assets/G0P0.svg';

import {
  Container,
  TagContainer,
  OrderDataContainer,
  TagList,
  TagItem,
  Checklist,
  ChecklistItem,
} from './styles';

const Tags: React.FC = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const times = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
  ];

  return (
    <Container>
      <div style={{ display: 'none' }} className="print-container">
        <TagContainer ref={componentRef}>
          <div style={{ height: '90vh' }}>
            <Typography.Title
              level={4}
              style={{ textAlign: 'center', marginBottom: '0px' }}
            >
              311 - Mateus Alcantara
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: '0px' }}
            >
              Frade
            </Typography.Title>

            <OrderDataContainer>
              <Typography>Data de Entrega: 05/07/2021</Typography>
              <Typography>Tipo de entrega: Entrega</Typography>
              <Typography>Telefone: (24) 99971-0064</Typography>
              <Typography>
                Endereço do cliente: Travessa dos Coqueiros, n° 40 - Frade,
                Angra dos Reis
              </Typography>
              <Typography>Observações: Cliente com urgencia</Typography>
            </OrderDataContainer>
            <Checklist>
              <ChecklistItem>
                <FiSquare size={15} style={{ marginRight: '4px' }} />
                <Typography.Text>
                  1 - 500 [ 0 ] x 200 [ 0 ] - MDF BRANCO TX 2 FACES COMUM 15MM
                </Typography.Text>
              </ChecklistItem>
              <ChecklistItem>
                <FiSquare size={15} style={{ marginRight: '4px' }} />
                <Typography.Text>
                  1 - 500 [ 0 ] x 200 [ 0 ] - MDF BRANCO TX 2 FACES COMUM 15MM
                </Typography.Text>
              </ChecklistItem>
              <ChecklistItem>
                <FiSquare size={15} style={{ marginRight: '4px' }} />
                <Typography.Text>
                  1 - 500 [ 0 ] x 200 [ 0 ] - MDF BRANCO TX 2 FACES COMUM 15MM
                </Typography.Text>
              </ChecklistItem>
            </Checklist>
            <Divider />
          </div>
          <TagList>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {times.map((_time) => (
              <>
                <div className="page-break" />
                <TagItem>
                  <img src={G0P0} alt="Etiqueta" />
                  <Typography.Text strong style={{ fontSize: '13px' }}>
                    500 x 200
                  </Typography.Text>
                  <Typography.Text>
                    MDF BRANCO TX 2 FACES COMUM 15MM
                  </Typography.Text>
                  <Typography.Text>12580 - Mateus Alcantara</Typography.Text>
                  <Typography.Text>Peça 01/04</Typography.Text>
                </TagItem>
              </>
            ))}
          </TagList>
        </TagContainer>
      </div>

      <Button type="link" onClick={handlePrint}>
        Imprimir etiquetas
      </Button>
    </Container>
  );
};

export default Tags;
