import React, { useCallback, useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Popconfirm,
  Form,
  Select,
  Input,
  InputNumber,
  Grid,
  Button,
  Spin,
  List,
  Avatar,
} from 'antd';
import { v4 } from 'uuid';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useMaterial } from '../../../hooks/Material';

import { CutlistPageContainer, InputCutlistContainer } from './styles';

import AntButton from '../../../components/AntButton';

import calculateCutlistPrice from '../../../utils/calculateCutlistPrice';

import ICutlistData from '../../../types/ICutlistData';
import ICutlist from '../../../types/ICutlist';
import IMaterial from '../../../types/IMaterial';

import G2P1 from '../../../assets/G2P1.svg';

interface ICutlistPageProps {
  setCutlist(data: ICutlist[]): void;
  cutlist: ICutlist[];
  totalPrice: number;
  handleUpdatePrice(newPrice: number): void;
  handleUpdatePriceBase(percent: number): void;
  priceBase: number | null;
}

interface IMaterialForm {
  name: string;
  width: number;
  height: number;
  price: number;
}

const CutlistPage: React.FC<ICutlistPageProps> = ({
  setCutlist,
  cutlist,
  totalPrice,
  handleUpdatePrice,
  handleUpdatePriceBase,
  priceBase,
}) => {
  const { createMaterial, loadMaterials } = useMaterial();
  const [form] = Form.useForm();
  const breakpoints = Grid.useBreakpoint();

  const [allMaterials, setAllMaterials] = useState<IMaterial[]>([]);
  const [cutlistDataSource, setCutlistDataSource] = useState<ICutlistData[]>(
    [],
  );
  const [listData, setListData] = useState<
    {
      key: string;
      title: string;
      description: string;
      avatar: string;
    }[]
  >([]);
  const [newMaterialForm, setNewMaterialForm] = useState(false);
  const [materialOptions, setMaterialOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [defaultMaterial, setDefaultMaterial] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const handleRemoveCutlist = useCallback(
    (id: string) => {
      const newCutlistDataSourceState = cutlistDataSource.filter(
        (cut) => cut.key !== id,
      );
      const newCutlistState = cutlist.filter((cut) => cut.id !== id);
      const priceToRemove = cutlistDataSource.find((cut) => cut.key === id)
        ?.price;

      if (priceToRemove) {
        handleUpdatePrice(priceToRemove * -1);
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
          value: material.name,
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
            setListData((prevVal) => [
              ...prevVal,
              {
                key: cut.id,
                title: `${cut.quantidade} - ${cut.side_a_size} [ ${cut.side_a_border} ] x ${cut.side_b_size} [ ${cut.side_b_border} ]`,
                description: `${materialUsed.name} | ${cut.price}`,
                avatar: G2P1,
              },
            ]);
          }
        });
      }
    }

    loadMaterialsAndCutsFromHook();
    setLoading(false);
  }, []);

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
        (materialFound) => materialFound.name === material,
      );

      if (!materialUsed) {
        throw new Error('Material does not exist');
      }

      let price: number;

      if (priceBase) {
        price = calculateCutlistPrice(
          materialUsed,
          {
            quantidade,
            side_a_border,
            side_a_size,
            side_b_border,
            side_b_size,
          },
          priceBase,
        );
      } else {
        price = calculateCutlistPrice(materialUsed, {
          quantidade,
          side_a_border,
          side_a_size,
          side_b_border,
          side_b_size,
        });
      }

      const cutlistId = v4();

      setCutlist([
        ...cutlist,
        {
          id: cutlistId,
          material_id: materialUsed.id,
          quantidade,
          price,
          side_a_size,
          side_a_border,
          side_b_border,
          side_b_size,
        },
      ]);

      handleUpdatePrice(price);

      setListData((prevVal) => [
        ...prevVal,
        {
          key: cutlistId,
          title: `${quantidade} - ${side_a_size} [ ${side_a_border} ] x ${side_b_size} [ ${side_b_border} ]`,
          description: `${materialUsed.name} | ${price}`,
          avatar: G2P1,
        },
      ]);

      // Update default material
      const materialToUpdateDefault = materialOptions.find(
        (materialFound) => materialFound.value === material,
      );

      if (materialToUpdateDefault) {
        setDefaultMaterial(materialOptions.indexOf(materialToUpdateDefault));
      }

      // Clear all fields of form
      form.resetFields([
        'quantidade',
        'side_a_size',
        'side_b_size',
        'side_a_border',
        'side_b_border',
      ]);
    },
    [cutlistDataSource, allMaterials, defaultMaterial, priceBase],
  );

  const handleSubmitMaterial = useCallback(
    async (materialData: IMaterialForm) => {
      const materialCreated = await createMaterial(materialData);

      setAllMaterials((prevValue) => [...prevValue, materialCreated]);

      setMaterialOptions((prevValue) => [
        ...prevValue,
        { value: materialCreated.name, label: materialCreated.name },
      ]);

      setNewMaterialForm(false);

      // Default material becomes created material
      setDefaultMaterial(materialOptions.length - 1);
    },
    [allMaterials, materialOptions],
  );

  const updatePriceBase = useCallback(
    ({ pricePercent }) => {
      handleUpdatePriceBase(pricePercent);
    },
    [priceBase],
  );

  if (loading) {
    return <Spin />;
  }

  if (!priceBase) {
    return (
      <Form
        form={form}
        onFinish={updatePriceBase}
        layout="vertical"
        labelAlign="left"
      >
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Tipo de cliente para cálculo do preço
        </Typography.Title>
        <Form.Item
          name="pricePercent"
          initialValue={75}
          style={{ width: '410px', margin: '0 auto 12px auto' }}
          rules={[
            {
              required: true,
              message: 'Por favor, selecione uma porcentagem para cálculo!',
            },
          ]}
          required={false}
        >
          <Select style={{ width: '100%', textAlign: 'center' }}>
            <Select.Option value={75}>Balcão</Select.Option>
            <Select.Option value={50}>Marceneiro</Select.Option>
            <Select.Option value={0}>Sem acréscimo</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Confirmar
        </Button>
      </Form>
    );
  }

  return (
    <CutlistPageContainer>
      <Typography.Title level={3} style={{ marginBottom: '32px' }}>
        Peças do pedido
      </Typography.Title>
      <InputCutlistContainer>
        {!newMaterialForm ? (
          <Form
            onFinish={handleSubmit}
            validateTrigger="onFinish"
            form={form}
            name="control-hooks"
            layout={breakpoints.sm ? 'inline' : 'horizontal'}
            wrapperCol={{ span: 24 }}
            style={{ width: breakpoints.sm ? '100%' : '50%' }}
          >
            {/* Input de material */}
            <Form.Item
              name="material"
              preserve
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
                allowClear
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
        ) : (
          <Form
            onFinish={handleSubmitMaterial}
            form={form}
            name="control-hooks"
            layout={breakpoints.sm ? 'inline' : 'horizontal'}
            wrapperCol={{ span: 24 }}
            style={{ width: breakpoints.sm ? '100%' : '50%' }}
          >
            <Form.Item
              style={{
                width: breakpoints.sm ? '450px' : '350px',
              }}
              name="name"
              rules={[
                {
                  required: true,
                  min: 1,
                  type: 'string',
                  message: 'Insira o nome do material',
                },
              ]}
            >
              <Input placeholder="Material" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="price"
              style={{ width: breakpoints.sm ? '75px' : '350px' }}
              rules={[
                {
                  required: true,
                  min: 1,
                  type: 'number',
                  message: 'Insira um número',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Preço" />
            </Form.Item>
            <Form.Item
              name="width"
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
              <InputNumber style={{ width: '100%' }} placeholder="Largura" />
            </Form.Item>
            <Form.Item
              name="height"
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
              <InputNumber style={{ width: '100%' }} placeholder="Altura" />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Adicionar material
            </Button>
          </Form>
        )}

        {newMaterialForm ? (
          <Button
            htmlType="button"
            type="link"
            onClick={() => setNewMaterialForm(false)}
            style={{ marginTop: '8px' }}
          >
            Nova Peça
          </Button>
        ) : (
          <Button
            htmlType="button"
            type="link"
            onClick={() => setNewMaterialForm(true)}
            style={{ marginTop: '8px' }}
          >
            Novo material
          </Button>
        )}
      </InputCutlistContainer>
      <Divider />
      <List
        dataSource={listData}
        itemLayout="horizontal"
        footer={<div>{`Total: R$ ${totalPrice}`}</div>}
        style={{ width: '100%', margin: '0 auto 64px auto' }}
        renderItem={(item) => (
          <List.Item
            style={{ textAlign: 'left' }}
            actions={[
              <Popconfirm
                title="Tem certeza de que deseja excluir essa peça?"
                onConfirm={() => handleRemoveCutlist(item.key)}
                okText="Sim"
                cancelText="Não"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <AntButton type="link">Remover</AntButton>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} shape="square" />}
              title={<Typography>{item.title}</Typography>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </CutlistPageContainer>
  );
};

export default CutlistPage;
