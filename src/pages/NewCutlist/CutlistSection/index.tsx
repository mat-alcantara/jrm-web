import React, { useCallback, useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Table,
  Space,
  Popconfirm,
  Form,
  Select,
  Input,
  InputNumber,
  Grid,
} from 'antd';
import { v4 } from 'uuid';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { number } from 'yup/lib/locale';
import { useMaterial } from '../../../hooks/Material';

import { CutlistPageContainer, InputCutlistContainer } from './styles';

import AntButton from '../../../components/AntButton';

import calculateCutlistPrice from '../../../utils/calculateCutlistPrice';

import ICutlistData from '../../../types/ICutlistData';
import ICutlist from '../../../types/ICutlist';
import IMaterial from '../../../types/IMaterial';

interface ICutlistPageProps {
  setCutlist(data: ICutlist[]): void;
  cutlist: ICutlist[];
}

interface IMaterialForm {
  name: string;
  width: number;
  height: number;
  price: number;
}

const CutlistPage: React.FC<ICutlistPageProps> = ({ setCutlist, cutlist }) => {
  const { createMaterial, loadMaterials } = useMaterial();
  const [form] = Form.useForm();
  const breakpoints = Grid.useBreakpoint();

  const [allMaterials, setAllMaterials] = useState<IMaterial[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cutlistDataSource, setCutlistDataSource] = useState<ICutlistData[]>(
    [],
  );
  const [newCutlistForm, setNewCutlistForm] = useState(true);
  const [newMaterialForm, setNewMaterialForm] = useState(false);
  const [materialOptions, setMaterialOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [defaultMaterial, setDefaultMaterial] = useState<number | undefined>(
    undefined,
  );

  const handleRemoveCutlist = useCallback(
    (id: string) => {
      const newCutlistDataSourceState = cutlistDataSource.filter(
        (cut) => cut.key !== id,
      );
      const newCutlistState = cutlist.filter((cut) => cut.id !== id);
      const priceToRemove = cutlistDataSource.find((cut) => cut.key === id)
        ?.price;

      if (priceToRemove) {
        setTotalPrice((prevValue) => prevValue - priceToRemove);
      }

      setCutlistDataSource([...newCutlistDataSourceState]);
      setCutlist([...newCutlistState]);
    },
    [cutlist, cutlistDataSource],
  );

  useEffect(() => {
    async function loadMaterialsAndCutsFromHook() {
      const allMaterialsFromHook = await loadMaterials();

      setAllMaterials([...allMaterialsFromHook]);

      const allMaterialOptions = allMaterialsFromHook.map((material) => {
        return {
          label: material.name,
          value: material.id,
        };
      });

      setMaterialOptions([...allMaterialOptions]);

      // Load Cutlist Data Source
      if (cutlist.length > 0) {
        cutlist.forEach((cut) => {
          const materialUsed = allMaterialsFromHook.find(
            (materialFound) => materialFound.id === cut.material_id,
          );

          if (materialUsed) {
            setCutlistDataSource((prevVal) => [
              ...prevVal,
              {
                key: cut.id,
                material: materialUsed.name,
                quantidade: cut.quantidade,
                price: cut.price,
                side_a_size: cut.side_a_size,
                side_a_border: cut.side_b_border,
                side_b_border: cut.side_b_border,
                side_b_size: cut.side_b_size,
              },
            ]);
          }
        });
      }
    }

    loadMaterialsAndCutsFromHook();
  }, []);

  const options = {
    sideOptions: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ],
    columns: [
      {
        title: 'Material',
        dataIndex: 'material',
        key: 'material',
      },
      {
        title: 'Qtd.',
        dataIndex: 'quantidade',
        key: 'quantidade',
      },
      {
        title: 'Lado A',
        dataIndex: 'side_a_size',
        key: 'side_a_size',
      },
      {
        title: 'Fita A',
        dataIndex: 'side_a_border',
        key: 'side_b_border',
      },
      {
        title: 'Lado B',
        dataIndex: 'side_b_size',
        key: 'side_b_size',
      },
      {
        title: 'Fita B',
        dataIndex: 'side_b_border',
        key: 'side_b_border',
      },
      {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '',
        key: 'action',
        render: (text: string, record: ICutlistData) => (
          <Space size="middle">
            <Popconfirm
              title="Tem certeza de que deseja excluir essa peça?"
              onConfirm={() => handleRemoveCutlist(record.key)}
              okText="Sim"
              cancelText="Não"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <AntButton type="link">Remover</AntButton>
            </Popconfirm>
          </Space>
        ),
      },
    ],
  };

  const handleSubmit = useCallback(
    async ({
      material,
      quantidade,
      side_a_border,
      side_a_size,
      side_b_border,
      side_b_size,
    }: ICutlistData) => {
      const materialUsed = allMaterials.find(
        (materialFound) => materialFound.id === material,
      );

      if (!materialUsed) {
        throw new Error('Material does not exist');
      }

      const price = calculateCutlistPrice(materialUsed, {
        quantidade,
        side_a_border,
        side_a_size,
        side_b_border,
        side_b_size,
      });

      const cutlistId = v4();

      setCutlist([
        ...cutlist,
        {
          id: cutlistId,
          material_id: material,
          quantidade,
          price,
          side_a_size,
          side_a_border,
          side_b_border,
          side_b_size,
        },
      ]);

      setTotalPrice((prev) => prev + price);

      setCutlistDataSource((prevVal) => [
        ...prevVal,
        {
          key: cutlistId,
          material: materialUsed.name,
          quantidade,
          price,
          side_a_size,
          side_a_border,
          side_b_border,
          side_b_size,
        },
      ]);

      // Update default material
      const materialToUpdateDefault = materialOptions.find(
        (materialFound) => materialFound.value === material,
      );

      if (materialToUpdateDefault) {
        setDefaultMaterial(materialOptions.indexOf(materialToUpdateDefault));
      }

      // Restart Form
      setNewCutlistForm(false);
      setNewCutlistForm(true);
    },
    [cutlistDataSource, allMaterials, defaultMaterial],
  );

  const handleSubmitMaterial = useCallback(
    async (materialData: IMaterialForm) => {
      const materialCreated = await createMaterial(materialData);

      setAllMaterials((prevValue) => [...prevValue, materialCreated]);

      setMaterialOptions((prevValue) => [
        ...prevValue,
        { value: materialCreated.id, label: materialCreated.name },
      ]);

      setNewMaterialForm(false);

      // Default material becomes created material
      setDefaultMaterial(materialOptions.length - 1);

      // Restart Form
      setNewCutlistForm(false);
      setNewCutlistForm(true);
    },
    [allMaterials, materialOptions],
  );

  return (
    <CutlistPageContainer>
      <Typography.Title level={3} style={{ marginBottom: '32px' }}>
        Peças do pedido
      </Typography.Title>
      <InputCutlistContainer>
        {/* Formulário de nova peça */}
        {newCutlistForm && (
          <Form
            onFinish={handleSubmit}
            form={form}
            name="control-hooks"
            layout={breakpoints.sm ? 'inline' : 'horizontal'}
            wrapperCol={{ span: 24 }}
            style={{ width: breakpoints.sm ? '100%' : '50%' }}
          >
            {/* Input de material */}
            <Form.Item
              name="material"
              required={false}
              style={{
                width: breakpoints.sm ? '450px' : '350px',
              }}
              rules={[
                {
                  required: true,
                  message: 'Material necessário',
                },
              ]}
            >
              <Select
                placeholder="Material"
                showSearch
                style={{
                  width: '100%',
                  fontSize: breakpoints.sm ? '' : '10px',
                }}
              >
                {materialOptions.map((material) => (
                  <Select.Option value={material.value}>
                    {material.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Input da quantidade */}
            <Form.Item
              name="quantidade"
              required={false}
              style={{ width: breakpoints.sm ? '75px' : '350px' }}
              rules={[
                {
                  required: true,
                  message: 'Insira um valor entre 1 e 100',
                  type: 'number',
                  min: 1,
                  max: 100,
                },
              ]}
            >
              <InputNumber placeholder="Qtd" style={{ width: '100%' }} />
            </Form.Item>

            {/* Input do lado A */}
            <Form.Item
              name="side_a_size"
              required={false}
              style={{ width: breakpoints.sm ? '150px' : '350px' }}
              rules={[
                {
                  required: true,
                  min: 60,
                  max: 2750,
                  type: 'number',
                  message: 'Insira um valor entre 60 e 2750',
                },
              ]}
            >
              <InputNumber placeholder="Lado A" style={{ width: '100%' }} />
            </Form.Item>

            {/* Input da fita A */}
            <Form.Item
              name="side_a_border"
              required={false}
              initialValue={0}
              style={{ width: breakpoints.sm ? '' : '350px' }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Fita A">
                <Select.Option value={0}>0</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
              </Select>
            </Form.Item>

            {/* Input do lado B */}
            <Form.Item
              name="side_b_size"
              required={false}
              style={{ width: breakpoints.sm ? '150px' : '350px' }}
              rules={[
                {
                  required: true,
                  min: 60,
                  max: 2750,
                  type: 'number',
                  message: 'Insira um valor entre 60 e 2750',
                },
              ]}
            >
              <InputNumber placeholder="Lado B" style={{ width: '100%' }} />
            </Form.Item>

            {/* Input da fita B */}
            <Form.Item
              name="side_b_border"
              required={false}
              style={{ width: breakpoints.sm ? '' : '350px' }}
              initialValue={0}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Fita B">
                <Select.Option value={0}>0</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
              </Select>
            </Form.Item>

            {/* Confirm Button */}
            <AntButton
              htmlType="submit"
              type="primary"
              block={!breakpoints.sm}
              style={{ width: breakpoints.sm ? '' : '350px' }}
            >
              Adicionar
            </AntButton>
          </Form>
        )}
        <AntButton
          htmlType="button"
          type="link"
          onClick={() => setNewMaterialForm(true)}
        >
          Novo material
        </AntButton>

        {/* {newMaterialForm && (
          <Form onFinish={handleSubmitMaterial}>
            <AntInput name="name" placeholder="Material" size="large" />
            <AntInput name="price" placeholder="Price" size="large" />
            <AntInput name="width" placeholder="Largura" size="large" />
            <AntInput name="height" placeholder="Altura" size="large" />
            <AntButton htmlType="submit" type="link">
              Adicionar material
            </AntButton>
            <AntButton
              htmlType="button"
              type="link"
              onClick={() => setNewMaterialForm(false)}
            >
              Fechar
            </AntButton>
          </Form>
        )} */}
      </InputCutlistContainer>
      <Divider />
      {/* <Table
        columns={options.columns}
        dataSource={cutlistDataSource}
        footer={() => `Total: R$ ${totalPrice}`}
      /> */}
    </CutlistPageContainer>
  );
};

export default CutlistPage;
