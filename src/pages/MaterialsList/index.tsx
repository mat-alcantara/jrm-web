import React, { useState, useEffect, useCallback } from 'react';
import { List } from 'antd';

import api from '../../services/api';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

interface IMaterialsOptionsProps {
  name: string;
  price: number;
  id: string;
}

interface IMaterialsProps {
  name: string;
  price: number;
  id: string;
  width: number;
  height: number;
  created_at: number;
  updated_at: number;
}

const MaterialsList: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const [materialsListOptions, setMaterialsListOptions] = useState<
    IMaterialsOptionsProps[]
  >([]);

  useEffect(() => {
    async function loadMaterials() {
      const allMaterials = await api.get<IMaterialsProps[]>('/materials', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      console.log(allMaterials);
      allMaterials.data.forEach((material) => {
        setMaterialsListOptions((prevValue) => [
          ...prevValue,
          { id: material.id, name: material.name, price: material.price },
        ]);
      });
    }

    loadMaterials();
  }, []);

  const handleRemoveMaterial = useCallback(
    async (id: string) => {
      await api.delete(`/materials/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setMaterialsListOptions(() => {
        return materialsListOptions.filter((material) => material.id !== id);
      });
    },
    [materialsListOptions],
  );

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {materialsListOptions && (
            <List
              style={{ maxWidth: '600px', margin: '0 auto' }}
              itemLayout="horizontal"
              dataSource={materialsListOptions}
              renderItem={(material) => (
                <List.Item
                  actions={[
                    <AntButton
                      block
                      type="link"
                      onClick={() => handleRemoveMaterial(material.id)}
                    >
                      Excluir
                    </AntButton>,
                  ]}
                >
                  <List.Item.Meta
                    title={material.name}
                    description={`R$ ${material.price}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default MaterialsList;
