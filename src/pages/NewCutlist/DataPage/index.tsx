import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Typography } from 'antd';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import AntSelect from '../../../components/ReactSelect';
import AntButton from '../../../components/AntButton';
import AntInput from '../../../components/AntInput';

import IOrderData from '../../../types/IOrderData';

import { DataPageContainer, DataPageNextAndBackButton } from './styles';

interface IDataPageProps {
  setPage(page: number): void;
  page: number;
  setOrderData(data: IOrderData | undefined): void;
  orderData: IOrderData | undefined;
}

const DataPage: React.FC<IDataPageProps> = ({
  setPage,
  orderData,
  setOrderData,
  page,
}) => {
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
    deliveryType: [
      { value: 'Entrega', label: 'Entrega' },
      { value: 'Retirar na Loja', label: 'Retirar na Loja' },
    ],
  };

  const validateDataPageProps = useCallback(
    async (allOrderData: IOrderData) => {
      const schema = Yup.object().shape({
        seller: Yup.string().required('Vendedor obrigatório'),
        orderStore: Yup.string().required('Loja obrigatória'),
        paymentStatus: Yup.string().required('Método de pagamento obrigatório'),
        ps: Yup.string().nullable(),
        orderStatus: Yup.string(),
        pricePercent: Yup.number()
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

  const handleSubmitDataPage = useCallback(async (allOrderData: IOrderData) => {
    try {
      await validateDataPageProps(allOrderData);

      setOrderData(allOrderData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

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
        <AntSelect
          name="deliveryType"
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
            disabled={!orderData}
          >
            Avançar
          </AntButton>
        </DataPageNextAndBackButton>
      )}
    </DataPageContainer>
  );
};

export default DataPage;
