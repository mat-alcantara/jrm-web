import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Typography, Divider, Table, Space } from 'antd';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { v4 } from 'uuid';

import { useMaterial } from '../../../hooks/Material';

import { CutlistPageContainer, InputCutlistContainer } from './styles';

import AntInput from '../../../components/AntInput';
import AntSelect from '../../../components/ReactSelect';
import AntButton from '../../../components/AntButton';

import calculateCutlistPrice from '../../../utils/calculateCutlistPrice';
import getValidationErrors from '../../../utils/getValidationErrors';

import ICutlistData from '../../../types/ICutlistData';
import ICutlist from '../../../types/ICutlist';
import IOrderData from '../../../types/IOrderData';
import IMaterial from '../../../types/IMaterial';

interface ICutlistPageProps {
  orderData: IOrderData | undefined;
  setCutlist(data: ICutlist[]): void;
  cutlist: ICutlist[];
}

interface IMaterialForm {
  name: string;
  width: number;
  height: number;
  price: number;
}

const CutlistPage: React.FC<ICutlistPageProps> = ({
  orderData,
  setCutlist,
  cutlist,
}) => {
  const { createMaterial, loadMaterials } = useMaterial();
  const formRef = useRef<FormHandles>(null);
  const materialFormRef = useRef<FormHandles>(null);

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

  const refreshMaterials = useCallback(() => {
    const allMaterialOptions = allMaterials.map((material) => {
      return {
        value: material.id,
        label: material.name,
      };
    });

    setMaterialOptions([...allMaterialOptions]);
  }, []);

  useEffect(() => {
    async function loadMaterialsFromHook() {
      const allMaterialsFromHook = await loadMaterials();

      setAllMaterials([...allMaterialsFromHook]);
    }

    loadMaterialsFromHook();
    refreshMaterials();
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
        title: 'Quantidade',
        dataIndex: 'quantidade',
        key: 'quantidade',
      },
      {
        title: 'Tamanho A',
        dataIndex: 'side_a_size',
        key: 'side_a_size',
      },
      {
        title: 'Fita A',
        dataIndex: 'side_a_border',
        key: 'side_b_border',
      },
      {
        title: 'Tamanho B',
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
            <AntButton
              onClick={() => handleRemoveCutlist(record.key)}
              type="link"
            >
              Remover
            </AntButton>
          </Space>
        ),
      },
    ],
  };

  const validateCutlistPageProps = useCallback(
    async (cutlistData: Omit<ICutlistData, 'key'>) => {
      const schema = Yup.object().shape({
        material: Yup.string().required(),
        quantidade: Yup.number().required('Quantidade necessária'),
        price: Yup.number().required(),
        side_a_size: Yup.number()
          .min(60, 'Deve ter pelo menos 6mm')
          .max(2750, 'Não deve ultrapassar 2750mm')
          .required('Tamanho necessário'),
        side_b_size: Yup.number()
          .min(60, 'Deve ter pelo menos 6mm')
          .max(2750, 'Não deve ultrapassar 2750mm')
          .required('Tamanho necessário'),
        side_a_border: Yup.number().min(0).max(2).required(),
        side_b_border: Yup.number().min(0).max(2).required(),
      });

      const isPropsValid = await schema.validate(cutlistData, {
        // Faz com que todos os erros sejam pegos pelo catch
        abortEarly: false,
      });

      return isPropsValid;
    },
    [],
  );

  const validateMaterialProps = useCallback(
    async (materialData: IMaterialForm) => {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        price: Yup.number().required('Preço obrigatório'),
        width: Yup.number().required('Largura obrigatória').max(2750),
        height: Yup.number().required('Altura obrigatória').max(1850),
      });

      const isPropsValid = await schema.validate(materialData, {
        // Faz com que todos os erros sejam pegos pelo catch
        abortEarly: false,
      });

      return isPropsValid;
    },
    [],
  );

  const handleSubmit = useCallback(
    async ({
      material,
      quantidade,
      side_a_border,
      side_a_size,
      side_b_border,
      side_b_size,
    }: ICutlistData) => {
      try {
        const materialUsed = allMaterials.find(
          (materialFound) => materialFound.id === material,
        );

        if (!materialUsed) {
          throw new Error('Material does not exist');
        }

        let price: number;

        if (orderData) {
          price = calculateCutlistPrice(orderData, materialUsed, {
            quantidade,
            side_a_border,
            side_a_size,
            side_b_border,
            side_b_size,
          });
        } else {
          price = 0;
        }

        await validateCutlistPageProps({
          material: materialUsed.name,
          quantidade,
          price,
          side_a_size,
          side_a_border,
          side_b_border,
          side_b_size,
        });

        const cutlistId = v4();

        await setCutlist([
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

        await setTotalPrice((prev) => prev + price);

        await setCutlistDataSource((prevVal) => [
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

        setNewCutlistForm(false);
        setNewCutlistForm(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [cutlistDataSource],
  );

  const handleSubmitMaterial = useCallback(
    async (materialData: IMaterialForm) => {
      try {
        await validateMaterialProps(materialData);

        const materialCreated = await createMaterial(materialData);

        allMaterials.push(materialCreated);

        refreshMaterials();

        setNewMaterialForm(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          materialFormRef.current?.setErrors(errors);
        }
      }
    },
    [],
  );

  return (
    <CutlistPageContainer>
      <Typography.Title level={2}>Peças do pedido</Typography.Title>
      <InputCutlistContainer>
        {newCutlistForm && (
          <Form onSubmit={handleSubmit} ref={formRef}>
            <AntSelect
              name="material"
              placeholder="Material"
              className="materialSelect"
              options={materialOptions}
            />
            <AntInput name="quantidade" placeholder="Qtd" size="large" />
            <AntInput name="side_a_size" placeholder="Lado A" size="large" />
            <AntSelect
              name="side_a_border"
              options={options.sideOptions}
              placeholder="Fita A"
            />
            <AntInput name="side_b_size" placeholder="Lado B" size="large" />
            <AntSelect
              name="side_b_border"
              options={options.sideOptions}
              placeholder="Fita B"
            />
            <AntButton htmlType="submit" type="link">
              Adicionar
            </AntButton>
            <AntButton
              htmlType="button"
              type="link"
              onClick={() => setNewMaterialForm(true)}
            >
              Novo material
            </AntButton>
          </Form>
        )}
        {newMaterialForm && (
          <Form onSubmit={handleSubmitMaterial} ref={materialFormRef}>
            <AntInput name="name" placeholder="Mterial" size="large" />
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
        )}
      </InputCutlistContainer>
      <Divider />
      <Table
        columns={options.columns}
        dataSource={cutlistDataSource}
        footer={() => `Total: ${totalPrice}`}
      />
    </CutlistPageContainer>
  );
};

export default CutlistPage;
