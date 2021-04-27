/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { AutoComplete, Divider, Steps, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core'; // List of props for form reference

import AntInputNumber from 'components/AntInputNumber';
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
}

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const { Step } = Steps;

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomersProps>();
  const [orderData, setOrderData] = useState<IOrderDataProps | null>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function loadCustomersFromApi() {
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

    loadCustomersFromApi();
  }, []);

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
        { value: 'Japuíba', label: 'Japuíba' },
        { value: 'Frade', label: 'Frade' },
        { value: 'São João de Meriti', label: 'São João de Meriti' },
      ],

      paymentType: [
        { value: 'Pago', label: 'Pago' },
        { value: 'Parcialmente Pago', label: 'Parcialmente Pago' },
        { value: 'Receber na Entrega', label: 'Receber na Entrega' },
        { value: 'Orçamento', label: 'Orçamento' },
      ],

      orderStatus: [
        { value: 'Em produção', label: 'Produção' },
        { value: 'Orçamento', label: 'Orçamento' },
      ],
    };

    const validateCustomerProps = useCallback(
      async ({
        seller,
        orderStore,
        orderStatus,
        paymentStatus,
        ps,
      }: IOrderDataProps) => {
        const schema = Yup.object().shape({
          seller: Yup.string().required('Vendedor obrigatório'),
          orderStore: Yup.string().required('Loja obrigatória'),
          paymentStatus: Yup.string().required(
            'Método de pagamento obrigatório',
          ),
          ps: Yup.string(),
          orderStatus: Yup.string(),
        });

        const isPropsValid = await schema.validate(
          { seller, orderStore, paymentStatus, ps, orderStatus },
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
      }: IOrderDataProps) => {
        try {
          await validateCustomerProps({
            seller,
            orderStore,
            paymentStatus,
            ps,
            orderStatus,
          });

          setOrderData({
            seller,
            orderStore,
            paymentStatus,
            ps,
            orderStatus,
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
            seller: orderData?.seller || '',
            ps: orderData?.ps || '',
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
            placeholder="Método de pagamento"
            options={options.paymentType}
            defaultInputValue={orderData?.paymentStatus}
            isClearable
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

    const options = {
      sideOptions: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
      ],
    };

    const handleSubmit = useCallback((data) => {
      console.log(data);
    }, []);

    return (
      <CutlistPageContainer>
        <Typography.Title level={2}>Peças do pedido</Typography.Title>
        <InputCutlistContainer>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <AntSelect
              name="quantidade"
              placeholder="Material"
              className="materialSelect"
            />
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
            <Typography.Text type="success" strong>
              R$ 250
            </Typography.Text>
            <AntButton htmlType="submit" type="link">
              Adicionar
            </AntButton>
          </Form>
        </InputCutlistContainer>
        <Divider />
      </CutlistPageContainer>
    );
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {page === 1 && <CustomerPage />}
          {page === 2 && <DataPage />}
          {page === 3 && <CutlistPage />}
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
