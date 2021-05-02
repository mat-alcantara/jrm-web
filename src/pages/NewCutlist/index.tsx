/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete, Divider, Steps, Typography, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core'; // List of props for form reference

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import {
  Container,
  CustomerPageContainer,
  StepsContainer,
  CustomerPageData,
  CustomerAutocompleteAndButton,
  DataPageContainer,
  DataPageNextAndBackButton,
  CutlistPageContainer,
  InputCutlistContainer,
} from './styles';

import AntInput from '../../components/AntInput';
import AntSelect from '../../components/ReactSelect';
import AntButton from '../../components/AntButton';

interface ICustomersProps {
  id: string;
  name: string;
  telephone: string;
  email: string;
  street: string;
  area: string;
  city: string;
  state: string;
}

interface IOrderDataProps {
  seller: string;
  orderStore: string;
  paymentStatus: string;
  orderStatus: string;
  ps?: string;
  pricePercent: number;
}

interface IMaterialsProps {
  id: string;
  name: string;
  width: number;
  height: number;
  price: number;
}

interface ICutlistProps {
  material: string;
  quantidade: number;
  side_a_size: number;
  side_b_size: number;
  side_a_border: number;
  side_b_border: number;
  price?: number;
}

interface ICutlistDataSource {
  key: number;
  material: string;
  quantidade: number;
  side_a_size: number;
  side_b_size: number;
  side_a_border: number;
  side_b_border: number;
  price: number | undefined;
}

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');
  const history = useHistory();

  const { Step } = Steps;

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);
  const [allMaterials, setAllMaterials] = useState<IMaterialsProps[]>([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomersProps>();
  const [orderData, setOrderData] = useState<IOrderDataProps | null>();
  const [page, setPage] = useState<number>(1);
  const [cutlist, setCutlist] = useState<ICutlistProps[]>([]);
  const [cutlistDataSource, setCutlistDataSource] = useState<
    ICutlistDataSource[]
  >([]);

  useEffect(() => {
    async function loadCustomersFromApi() {
      // Load Customers
      const allCustomersFromApi = await api.get<ICustomersProps[]>(
        '/customers',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      setAutoCompleteOptions((prevVal) => {
        const allOptions = allCustomersFromApi.data.map((customer) => {
          return { value: customer.name, id: customer.id };
        });

        return [...prevVal, ...allOptions];
      });

      setAllCustomers([...allCustomersFromApi.data]);
    }

    async function loadMaterialsFromApi() {
      // Load materials
      const allMaterialsFromApi = await api.get<IMaterialsProps[]>(
        '/materials',
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      setAllMaterials([...allMaterialsFromApi.data]);
    }

    loadCustomersFromApi();
    loadMaterialsFromApi();
  }, []);

  const handleSubmitData = useCallback(async () => {
    const cutlistWithPriceRemoved = cutlist.map((currentCutlist) => {
      return {
        material: currentCutlist.material,
        side_a_size: currentCutlist.side_a_size,
        side_b_size: currentCutlist.side_b_size,
        side_a_border: currentCutlist.side_a_border,
        side_b_border: currentCutlist.side_b_border,
        quantidade: currentCutlist.quantidade,
      };
    });

    const orderPostData = {
      customerId: selectedCustomer?.id,
      cutlist: cutlistWithPriceRemoved,
      orderStore: orderData?.orderStore,
      orderStatus: orderData?.orderStatus,
      paymentStatus: orderData?.paymentStatus,
      ps: orderData?.ps,
      seller: orderData?.seller,
      price: 250,
    };

    await api.post('/orders', orderPostData, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    history.push('/newcustomer');
  }, [selectedCustomer, orderData, cutlist]);

  const CustomerPage: React.FC = () => {
    const handleSelectedCustomer = useCallback(
      (value: string, option) => {
        const customerSelectedByAutocomplete = allCustomers.find(
          (customer) => customer.id === option.id,
        );

        setSelectedCustomer(customerSelectedByAutocomplete);
      },
      [allCustomers, selectedCustomer],
    );

    return (
      <CustomerPageContainer>
        <Typography.Title level={2}>Selecione um cliente</Typography.Title>
        <CustomerAutocompleteAndButton>
          <AutoComplete
            placeholder="Digite o nome de um cliente"
            options={autoCompleteOptions}
            onSelect={handleSelectedCustomer}
          />
          <AntButton
            type="default"
            disabled={!selectedCustomer}
            onClick={() => setPage(2)}
          >
            Próximo
          </AntButton>
        </CustomerAutocompleteAndButton>
        {selectedCustomer && (
          <CustomerPageData>
            <CheckCircleOutlined style={{ color: 'green' }} />
            <Typography.Title level={4}>
              {selectedCustomer.name}
            </Typography.Title>
            <Typography>
              {`${selectedCustomer.street}, ${selectedCustomer.area} - ${selectedCustomer.city}`}
            </Typography>
          </CustomerPageData>
        )}
      </CustomerPageContainer>
    );
  };

  const DataPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const options = {
      orderStore: [
        { value: 'Japuiba', label: 'Japuíba' },
        { value: 'Frade', label: 'Frade' },
        { value: 'São João de Meriti', label: 'São João de Meriti' },
      ],

      paymentType: [
        { value: 'Pago', label: 'Pago' },
        { value: 'Parcialmente Pago', label: 'Parcialmente Pago' },
        { value: 'Receber na Entrega', label: 'Receber na Entrega' },
      ],

      orderStatus: [
        { value: 'Em Produção', label: 'Produção' },
        { value: 'Orçamento', label: 'Orçamento' },
      ],
    };

    const validateDataPageProps = useCallback(
      async ({
        seller,
        orderStore,
        orderStatus,
        paymentStatus,
        ps,
        pricePercent,
      }: IOrderDataProps) => {
        const schema = Yup.object().shape({
          seller: Yup.string().required('Vendedor obrigatório'),
          orderStore: Yup.string().required('Loja obrigatória'),
          paymentStatus: Yup.string().required(
            'Método de pagamento obrigatório',
          ),
          ps: Yup.string().nullable(),
          orderStatus: Yup.string(),
          pricePercent: Yup.number()
            .min(0, 'Valor deve ser maior que 0')
            .max(100, 'Valor deve ser menor do que 100')
            .required('Porcentagem necessária para calculo do preço'),
        });

        const isPropsValid = await schema.validate(
          { seller, orderStore, paymentStatus, ps, orderStatus, pricePercent },
          {
            // Faz com que todos os erros sejam pegos pelo catch
            abortEarly: false,
          },
        );

        return isPropsValid;
      },
      [],
    );

    const handleSubmitDataPage = useCallback(
      async ({
        seller,
        orderStore,
        paymentStatus,
        orderStatus,
        ps,
        pricePercent,
      }: IOrderDataProps) => {
        try {
          await validateDataPageProps({
            seller,
            orderStore,
            paymentStatus,
            ps,
            orderStatus,
            pricePercent,
          });

          setOrderData({
            seller,
            orderStore,
            paymentStatus,
            ps,
            orderStatus,
            pricePercent,
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
          }
        }
      },
      [],
    );

    return (
      <DataPageContainer>
        <Typography.Title level={2}>Dados do pedido</Typography.Title>
        <Form
          onSubmit={handleSubmitDataPage}
          ref={formRef}
          initialData={{
            seller: orderData?.seller,
            ps: orderData?.ps,
            pricePercent: orderData?.pricePercent,
          }}
        >
          <AntSelect
            name="orderStatus"
            placeholder="Tipo do pedido"
            options={options.orderStatus}
            defaultInputValue={orderData?.orderStatus}
            isClearable
          />
          <AntInput
            name="seller"
            placeholder="Vendedor"
            size="large"
            defaultValue={orderData?.seller}
          />
          <AntSelect
            name="orderStore"
            placeholder="Loja do pedido"
            options={options.orderStore}
            defaultInputValue={orderData?.orderStore}
            isClearable
          />
          <AntSelect
            name="paymentStatus"
            placeholder="Status de pagamento"
            options={options.paymentType}
            defaultInputValue={orderData?.paymentStatus}
            isClearable
          />
          <AntInput
            name="pricePercent"
            placeholder="Porcentagem do preço"
            size="large"
            defaultValue={orderData?.pricePercent}
          />
          <AntInput
            name="ps"
            placeholder="Observações"
            size="large"
            defaultValue={orderData?.ps}
          />
          <AntButton
            block
            htmlType="submit"
            type="primary"
            disabled={!!orderData}
          >
            Confirmar
          </AntButton>
        </Form>
        {orderData && (
          <DataPageNextAndBackButton>
            <AntButton onClick={() => setPage(page - 1)} type="default">
              Voltar
            </AntButton>
            <AntButton
              block
              htmlType="button"
              type="default"
              style={{ color: '#cc0000' }}
              onClick={() => setOrderData(null)}
            >
              Limpar
            </AntButton>
            <AntButton
              onClick={() => setPage(page + 1)}
              type="default"
              disabled={!orderData}
            >
              Avançar
            </AntButton>
          </DataPageNextAndBackButton>
        )}
      </DataPageContainer>
    );
  };

  const CutlistPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const allMaterialsOptions = allMaterials.map((material) => {
      return {
        value: material.id,
        label: material.name,
      };
    });

    const options = {
      sideOptions: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
      ],
      materialsOptions: [...allMaterialsOptions],
    };

    const columns = [
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
    ];

    const calculateCutlistPrice = useCallback(
      (material: IMaterialsProps, cutlistData: ICutlistProps) => {
        const qtd = cutlistData.quantidade;
        const At = material.width * material.height;
        const Ap = cutlistData.side_a_size * cutlistData.side_b_size;
        const preço = material.price;
        const LFp = cutlistData.side_a_size * cutlistData.side_a_border;
        const AFp = cutlistData.side_b_size * cutlistData.side_b_border;
        let porc: number;

        if (orderData?.pricePercent) {
          porc = orderData?.pricePercent;
        } else {
          porc = 75;
        }

        const calculatedMaterial = (Ap * preço * (1 + porc / 100)) / At;

        const calculatedBorder = (3 * (LFp + AFp)) / 1000;

        const calculatedPrice = calculatedMaterial + calculatedBorder;

        return qtd * Math.ceil(calculatedPrice);
      },
      [orderData],
    );

    const validateCutlistPageProps = useCallback(
      async ({
        material,
        quantidade,
        price,
        side_a_border,
        side_a_size,
        side_b_border,
        side_b_size,
      }: ICutlistProps) => {
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

        const isPropsValid = await schema.validate(
          {
            material,
            quantidade,
            price,
            side_a_border,
            side_a_size,
            side_b_border,
            side_b_size,
          },
          {
            // Faz com que todos os erros sejam pegos pelo catch
            abortEarly: false,
          },
        );

        return isPropsValid;
      },
      [],
    );

    const handleSubmit = useCallback(
      async ({
        material,
        quantidade,
        side_a_size,
        side_a_border,
        side_b_border,
        side_b_size,
      }: ICutlistProps) => {
        try {
          const materialUsed = allMaterials.find(
            (materialFound) => materialFound.id === material,
          );

          if (!materialUsed) {
            throw new Error('Material does not exist');
          }

          const price = calculateCutlistPrice(materialUsed, {
            material,
            quantidade,
            side_a_size,
            side_a_border,
            side_b_border,
            side_b_size,
          });

          await validateCutlistPageProps({
            material: materialUsed.name,
            quantidade,
            price,
            side_a_size,
            side_a_border,
            side_b_border,
            side_b_size,
          });

          await setCutlist((prevVal) => [
            ...prevVal,
            {
              material: materialUsed.name,
              quantidade,
              price,
              side_a_size,
              side_a_border,
              side_b_border,
              side_b_size,
            },
          ]);

          await setCutlistDataSource((prevVal) => [
            ...prevVal,
            {
              key: cutlistDataSource.length + 1,
              material: materialUsed.name,
              quantidade,
              price,
              side_a_size,
              side_a_border,
              side_b_border,
              side_b_size,
            },
          ]);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
          }
        }
      },
      [cutlist, cutlistDataSource],
    );

    return (
      <CutlistPageContainer>
        <Typography.Title level={2}>Peças do pedido</Typography.Title>
        <InputCutlistContainer>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <AntSelect
              name="material"
              placeholder="Material"
              className="materialSelect"
              options={options.materialsOptions}
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
          </Form>
        </InputCutlistContainer>
        <Divider />
        <Table columns={columns} dataSource={cutlistDataSource} />
      </CutlistPageContainer>
    );
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {page === 1 && <CustomerPage />}
          {page === 2 && <DataPage />}
          {page === 3 && (
            <>
              <CutlistPage />
              <AntButton
                block
                type="primary"
                size="large"
                onClick={() => handleSubmitData()}
                style={{ maxWidth: '1000px' }}
                disabled={!!cutlist}
              >
                Confirmar pedido
              </AntButton>
            </>
          )}
          <StepsContainer>
            <Steps current={page - 1}>
              <Step title="Cliente" description="Selecione um cliente" />
              <Step title="Dados" description="Forneça os dados do pedido" />
              <Step title="Peças" description="Forneça a lista de peças" />
            </Steps>
          </StepsContainer>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;
