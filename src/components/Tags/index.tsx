import { Button, Divider, Typography } from 'antd';
import { FiSquare } from 'react-icons/fi';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// import { sortCutlistData } from '../../utils/sortCutlistData';

import G0P0 from '../../assets/G0P0.svg';
import G1P2 from '../../assets/G1P2.svg';

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

  return (
    <Container>
      <div style={{ display: 'none' }}>
        <TagContainer ref={componentRef}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            311 - Mateus Alcantara
          </Typography.Title>

          <OrderDataContainer>
            <Typography>Data de Entrega: 05/07/2021</Typography>
            <Typography>Loja: Frade</Typography>
            <Typography>Tipo de entrega: Entrega</Typography>
            <Typography>
              Endereço do cliente: Travessa dos Coqueiros, n° 40
            </Typography>
          </OrderDataContainer>
          <Checklist>
            <ChecklistItem>
              <FiSquare size={20} style={{ marginRight: '8px' }} />
              <Typography.Text>
                1 - 500 [0] x 200 [0] - MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
            </ChecklistItem>
            <ChecklistItem>
              <FiSquare size={20} style={{ marginRight: '8px' }} />
              <Typography.Text>
                2 - 850 [1] x 400 [2] - MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
            </ChecklistItem>
            <ChecklistItem>
              <FiSquare size={20} style={{ marginRight: '8px' }} />
              <Typography.Text>
                1 - 600 [0] x 100 [0] - MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
            </ChecklistItem>
          </Checklist>
          <Divider />
          <TagList>
            <TagItem>
              <img src={G0P0} alt="Etiqueta" />
              <Typography.Text strong style={{ fontSize: '16px' }}>
                500 x 200
              </Typography.Text>
              <Typography.Text>
                MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
              <Typography.Text>Mateus Alcantara</Typography.Text>
              <Typography.Text type="secondary">Peça 01/04</Typography.Text>
            </TagItem>
            <TagItem>
              <img src={G1P2} alt="Etiqueta" />
              <Typography.Text strong style={{ fontSize: '16px' }}>
                850 x 400
              </Typography.Text>
              <Typography.Text>
                MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
              <Typography.Text>Mateus Alcantara</Typography.Text>
              <Typography.Text type="secondary">Peça 02/04</Typography.Text>
            </TagItem>
            <TagItem>
              <img src={G1P2} alt="Etiqueta" />
              <Typography.Text strong style={{ fontSize: '16px' }}>
                850 x 400
              </Typography.Text>
              <Typography.Text>
                MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
              <Typography.Text>Mateus Alcantara</Typography.Text>
              <Typography.Text type="secondary">Peça 03/04</Typography.Text>
            </TagItem>
            <TagItem>
              <img src={G0P0} alt="Etiqueta" />
              <Typography.Text strong style={{ fontSize: '16px' }}>
                600 x 100
              </Typography.Text>
              <Typography.Text>
                MDF BRANCO TX 2 FACES COMUM 15MM
              </Typography.Text>
              <Typography.Text>Mateus Alcantara</Typography.Text>
              <Typography.Text type="secondary">Peça 04/04</Typography.Text>
            </TagItem>
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
