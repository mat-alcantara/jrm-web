import { Button, Divider, Typography } from 'antd';
import { FiSquare } from 'react-icons/fi';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import IOrder from 'types/IOrder';
import ICustomer from 'types/ICustomer';
import IMaterial from 'types/IMaterial';
import { useMaterial } from '../../hooks/Material';
import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import { sortCutlistData } from '../../utils/sortCutlistData';

import {
  Container,
  TagContainer,
  OrderDataContainer,
  TagList,
  TagItem,
  Checklist,
  ChecklistItem,
} from './styles';

type CutlistProps = {
  gside: number;
  pside: number;
  avatar: string;
  material: string;
};

interface TagsProps {
  id: string;
}

const Tags: React.FC<TagsProps> = ({ id }) => {
  const componentRef = useRef(null);

  const { loadMaterials } = useMaterial();
  const { loadOrderFromId } = useOrder();
  const { loadCustomerFromId } = useCustomer();

  const [customer, setCustomer] = useState<ICustomer>();
  const [order, setOrder] = useState<IOrder>();
  const [allMaterials, setAllMaterials] = useState<IMaterial[]>();
  const [tagCutlist, setTagCutlist] = useState<CutlistProps[]>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const loadDataFromHook = async (orderId: string) => {
      const orderFromHook = await loadOrderFromId(orderId);

      const customerFromHook = await loadCustomerFromId(
        orderFromHook.customerId,
      );

      const allMaterialsFromHook = await loadMaterials();

      const allCutlistsFormated: CutlistProps[] = [];

      orderFromHook.cutlist.forEach((cut) => {
        const materialUsed = allMaterialsFromHook?.find(
          (material) => material.id === cut.material_id,
        );

        // Return GSide, PSide and Avatar
        const dataFromSortedCutlist = sortCutlistData({
          side_a_size: cut.side_a_size,
          side_b_size: cut.side_b_size,
          side_a_border: cut.side_a_border,
          side_b_border: cut.side_b_border,
        });

        // Create x tags according with number of pieces
        for (let i = 0; i < cut.quantidade; i += 1) {
          allCutlistsFormated.push({
            ...dataFromSortedCutlist,
            material: materialUsed?.name || 'Material removido',
          });
        }
      });

      setAllMaterials([...allMaterialsFromHook]);
      setOrder(orderFromHook);
      setCustomer(customerFromHook);
      setTagCutlist(allCutlistsFormated);
    };

    loadDataFromHook(id);
  }, []);

  return (
    <Container>
      <div style={{ display: 'none' }} className="print-container">
        <TagContainer ref={componentRef}>
          <div style={{ height: '90vh' }}>
            <Typography.Title
              level={4}
              style={{ textAlign: 'center', marginBottom: '0px' }}
            >
              {`${order?.order_code} - ${customer?.name}`}
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: '0px' }}
            >
              {order?.orderStore}
            </Typography.Title>

            <OrderDataContainer>
              <Typography>{`Data de Entrega: ${order?.deliveryDate}`}</Typography>
              <Typography>{`Tipo de entrega: ${order?.delivery_type}`}</Typography>
              <Typography>{`Telefone: ${customer?.telephone}`}</Typography>
              {order?.delivery_type === 'Entrega' && (
                <Typography>
                  {`Endereço do cliente: ${customer?.street} - ${customer?.area}, ${customer?.city}`}
                </Typography>
              )}
              {order?.ps && (
                <Typography>{`Observações: ${order?.ps}`}</Typography>
              )}
            </OrderDataContainer>
            <Checklist>
              {order?.cutlist.map((cut) => {
                const materialUsed = allMaterials?.find(
                  (material) => material.id === cut.material_id,
                );

                return (
                  <ChecklistItem key={cut.id}>
                    <FiSquare size={15} style={{ marginRight: '4px' }} />
                    {cut.side_a_size >= cut.side_b_size && (
                      <Typography.Text>
                        {`${cut.quantidade} - ${cut.side_a_size} [ ${
                          cut.side_a_border
                        } ] x ${cut.side_b_size} [ ${cut.side_b_border} ] - ${
                          (materialUsed && materialUsed.name) ||
                          'Material removido'
                        }`}
                      </Typography.Text>
                    )}
                    {cut.side_b_size > cut.side_a_size && (
                      <Typography.Text>
                        {`${cut.quantidade} - ${cut.side_b_size} [ ${
                          cut.side_b_border
                        } ] x ${cut.side_a_size} [ ${cut.side_a_border} ] - ${
                          (materialUsed && materialUsed.name) ||
                          'Material removido'
                        }`}
                      </Typography.Text>
                    )}
                  </ChecklistItem>
                );
              })}
              <Typography.Text
                style={{
                  marginTop: '15px',
                  marginBottom: '32px',
                  float: 'left',
                }}
              >
                {`Numero de peças: ${tagCutlist?.length} peça(s)`}
              </Typography.Text>
            </Checklist>
            <Divider />
          </div>
          <TagList>
            {tagCutlist
              ?.sort((a, b) => a.gside - b.gside)
              .map((cut, index) => {
                return (
                  <>
                    <div className="page-break" />
                    <TagItem>
                      <img src={cut.avatar} alt="Etiqueta" />
                      <Typography.Text strong style={{ fontSize: '13px' }}>
                        {`${cut.gside} x ${cut.pside}`}
                      </Typography.Text>
                      <Typography.Text>{`${cut.material}`}</Typography.Text>
                      <Typography.Text>{`${order?.order_code} - ${customer?.name}`}</Typography.Text>
                      <Typography.Text>
                        {`Peça ${index + 1}/${tagCutlist.length}`}
                      </Typography.Text>
                    </TagItem>
                  </>
                );
              })}
          </TagList>
        </TagContainer>
      </div>

      <Button type="link" onClick={handlePrint}>
        Etiquetas
      </Button>
    </Container>
  );
};

export default Tags;
