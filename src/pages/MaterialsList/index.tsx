import React, { useState, useEffect, useCallback } from 'react';
import { List } from 'antd';

import { useMaterial } from '../../hooks/Material';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

interface IMaterialsOptionsProps {
  name: string;
  price: number;
  id: string;
}

const MaterialsList: React.FC = () => {
  const { allMaterials, removeMaterial } = useMaterial();

  const [materialsListOptions, setMaterialsListOptions] = useState<
    IMaterialsOptionsProps[]
  >([]);

  useEffect(() => {
    allMaterials.forEach((material) => {
      setMaterialsListOptions((prevValue) => [
        ...prevValue,
        { id: material.id, name: material.name, price: material.price },
      ]);
    });
  }, []);

  const handleRemoveMaterial = useCallback(
    async (id: string) => {
      await removeMaterial(id);

      const filteredMaterialsList = materialsListOptions.filter(
        (material) => material.id !== id,
      );

      setMaterialsListOptions([...filteredMaterialsList]);
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
