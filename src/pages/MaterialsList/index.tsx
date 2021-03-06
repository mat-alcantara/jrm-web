import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Space, Typography, Popconfirm, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useMaterial } from '../../hooks/Material';
import { useAuth } from '../../hooks/Auth';

import { Container } from './styles';

import AntButton from '../../components/AntButton';

import AppContainer from '../../components/AppContainer';

interface IMaterialsTableProps {
  key: string;
  name: string;
  width: number;
  height: number;
  price: number;
}

const MaterialsList: React.FC = () => {
  const { loadMaterials, removeMaterial } = useMaterial();
  const { user } = useAuth();
  const history = useHistory();

  const [materialsDataSource, setMaterialsDataSource] = useState<
    IMaterialsTableProps[]
  >([]);

  useEffect(() => {
    if (user.userType !== 'production') {
      history.push('/dashboard');
    }

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
      title: 'Pre??o',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'actions',
      render: (record: IMaterialsTableProps) => (
        <Space size="small">
          <Popconfirm
            title="Tem certeza de que deseja excluir esse material?"
            onConfirm={() => handleRemoveMaterial(record.key)}
            okText="Sim"
            cancelText="N??o"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <AntButton type="link">Remover</AntButton>
          </Popconfirm>

          <Button type="link">Atualizar pre??o</Button>
        </Space>
      ),
    },
  ];

  return (
    <AppContainer>
      <Container>
        <Typography.Title level={3}>Lista de materiais</Typography.Title>
        <Table
          columns={tableColumns}
          dataSource={materialsDataSource}
          style={{ margin: '32px 128px' }}
        />
      </Container>
    </AppContainer>
  );
};

export default MaterialsList;
