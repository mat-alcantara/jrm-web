import React, { useState, useEffect, useCallback } from 'react';
import { Table, Space, Typography } from 'antd';

import { useMaterial } from '../../hooks/Material';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import AntButton from '../../components/AntButton';

interface IMaterialsTableProps {
  key: string;
  name: string;
  width: number;
  height: number;
  price: number;
}

const MaterialsList: React.FC = () => {
  const { loadMaterials, removeMaterial } = useMaterial();

  const [materialsDataSource, setMaterialsDataSource] = useState<
    IMaterialsTableProps[]
  >([]);

  useEffect(() => {
    async function loadAllMaterialsFromHook() {
      const materialsFromHook = await loadMaterials();

      materialsFromHook.forEach((material) => {
        setMaterialsDataSource((prevValue) => [
          ...prevValue,
          {
            key: material.id,
            name: material.name,
            width: material.width,
            height: material.height,
            price: material.price,
          },
        ]);
      });
    }

    loadAllMaterialsFromHook();
  }, []);

  const handleRemoveMaterial = useCallback(
    async (id: string) => {
      await removeMaterial(id);

      const filteredMaterialsDataSource = materialsDataSource.filter(
        (material) => material.key !== id,
      );

      setMaterialsDataSource([...filteredMaterialsDataSource]);
    },
    [materialsDataSource],
  );

  const tableColumns = [
    {
      title: 'Material',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Largura',
      dataIndex: 'width',
      key: 'width',
    },
    {
      title: 'Altura',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'actions',
      render: (record: IMaterialsTableProps) => (
        <Space size="small">
          <AntButton
            type="link"
            onClick={() => handleRemoveMaterial(record.key)}
          >
            Remover
          </AntButton>
          <a href="/">Editar</a>
        </Space>
      ),
    },
  ];

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <Typography.Title level={2}>Lista de materiais</Typography.Title>
          <Table
            columns={tableColumns}
            dataSource={materialsDataSource}
            style={{ margin: '32px 128px' }}
          />
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default MaterialsList;
