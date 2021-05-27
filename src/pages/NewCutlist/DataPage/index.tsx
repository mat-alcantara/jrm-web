import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Typography } from 'antd';
import * as Yup from 'yup';

import { useCustomer } from '../../../hooks/Customer';
import { useAuth } from '../../../hooks/Auth';

import getValidationErrors from '../../../utils/getValidationErrors';
import { areas } from '../../../utils/listOfAreas';

import AntSelect from '../../../components/ReactSelect';
import AntButton from '../../../components/AntButton';
import AntInput from '../../../components/AntInput';

import IOrderData from '../../../types/IOrderData';
import ICustomer from '../../../types/ICustomer';
import IAddressData from '../../../types/IAddressData';

import { DataPageContainer, DataPageNextAndBackButton } from './styles';

interface IDataPageProps {
  setPage(page: number): void;
  page: number;
  setOrderData(data: IOrderData | undefined): void;
  orderData: IOrderData | undefined;
  selectedCustomer: ICustomer | undefined;
}

const DataPage: React.FC<IDataPageProps> = ({
  setPage,
  orderData,
  setOrderData,
  page,
  selectedCustomer,
}) => {
  const [addressUpdate, setAddressUpdate] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);
  const formAddressRef = useRef<FormHandles>(null);
  const { updateCustomerAddress } = useCustomer();
  const { user } = useAuth();

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
    deliveryType: [
      { value: 'Entrega', label: 'Entrega' },
      { value: 'Retirar na Loja', label: 'Retirar na Loja' },
    ],
    areaOptions: areas.sort().map((area: string) => {
      return {
        value: area,
        label: area,
      };
    }),
    cityOptions: [
      { value: 'Angra dos Reis', label: 'Angra dos Reis' },
      { value: 'Paraty', label: 'Paraty' },
      { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
    ],
  };

  const validateDataPageProps = useCallback(
    async (allOrderData: Omit<IOrderData, 'seller'>) => {
      const schema = Yup.object().shape({
        orderStore: Yup.string().required('Loja obrigatória'),
        paymentStatus: Yup.string().required('Método de pagamento obrigatório'),
        ps: Yup.string().nullable(),
        orderStatus: Yup.string(),
        delivery_type: Yup.string().required('Tipo de entrega obrigatório'),
        pricePercent: Yup.number()
          .typeError('Valor precisa ser um número')
          .min(0, 'Valor deve ser maior que 0')
          .max(100, 'Valor deve ser menor do que 100')
          .required('Porcentagem necessária para calculo do preço'),
      });

      const isPropsValid = await schema.validate(allOrderData, {
        // Faz com que todos os erros sejam pegos pelo catch
        abortEarly: false,
      });

      return isPropsValid;
    },
    [],
  );

  const validateAddressProps = useCallback(
    async (addressData: IAddressData) => {
      const schema = Yup.object().shape({
        street: Yup.string().required('Endereço obrigatório'),
        city: Yup.string().required('Cidade obrigatória'),
        area: Yup.string().required('Bairro obrigatório'),
      });

      const isPropsValid = await schema.validate(addressData, {
        // Faz com que todos os erros sejam pegos pelo catch
        abortEarly: false,
      });

      return isPropsValid;
    },
    [],
  );

  const handleSubmitDataPage = useCallback(
    async (allOrderData: Omit<IOrderData, 'seller'>) => {
      try {
        await validateDataPageProps(allOrderData);

        if (
          allOrderData.delivery_type === 'Entrega' &&
          selectedCustomer?.street === 'Endereço não informado'
        ) {
          setAddressUpdate(true);
        } else {
          setAddressUpdate(false);
        }

        const seller = user.name;

        setOrderData({ ...allOrderData, seller });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [],
  );

  const handleSubmitCustomerAddress = useCallback(
    async (addressData: IAddressData) => {
      try {
        await validateAddressProps(addressData);

        if (selectedCustomer?.id) {
          await updateCustomerAddress(addressData, selectedCustomer.id);
        }

        await setAddressUpdate(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formAddressRef.current?.setErrors(errors);
        }
      }
    },
    [addressUpdate],
  );

  return (
    <DataPageContainer>
      <Typography.Title level={2}>Dados do pedido</Typography.Title>
      <Form
        onSubmit={handleSubmitDataPage}
        ref={formRef}
        initialData={{
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
        <AntSelect
          name="delivery_type"
          placeholder="Tipo de Entrega"
          options={options.deliveryType}
          defaultInputValue={orderData?.delivery_type}
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
      {addressUpdate && (
        <Form ref={formAddressRef} onSubmit={handleSubmitCustomerAddress}>
          <Typography.Title
            level={5}
            style={{ marginTop: '32px', marginBottom: '8px', color: 'red' }}
          >
            Endereço do cliente não fornecido. Atualize para continuar...
          </Typography.Title>
          <AntInput size="large" name="street" placeholder="Endereço" />
          <AntSelect
            placeholder="Bairro"
            name="area"
            options={options.areaOptions}
          />
          <AntSelect
            placeholder="Cidade"
            name="city"
            options={options.cityOptions}
          />
          <AntButton block htmlType="submit" type="primary">
            Atualizar endereço
          </AntButton>
        </Form>
      )}
      {orderData && (
        <DataPageNextAndBackButton>
          <AntButton onClick={() => setPage(page - 1)} type="default">
            Voltar
          </AntButton>
          <AntButton
            block
            htmlType="button"
            type="default"
            style={{ color: '#ff9966' }}
            onClick={() => setOrderData(undefined)}
          >
            Editar
          </AntButton>
          <AntButton
            onClick={() => setPage(page + 1)}
            type="default"
            disabled={!orderData || addressUpdate}
          >
            Avançar
          </AntButton>
        </DataPageNextAndBackButton>
      )}
    </DataPageContainer>
  );
};

export default DataPage;
