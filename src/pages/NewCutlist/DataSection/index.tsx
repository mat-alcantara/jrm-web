import React, { useCallback, useState } from 'react';
import { Typography, Form, Radio, Input, Select, Grid, DatePicker } from 'antd';

import { useCustomer } from '../../../hooks/Customer';
import { useAuth } from '../../../hooks/Auth';

import { areas } from '../../../utils/listOfAreas';

import AntButton from '../../../components/AntButton';

import IOrderData from '../../../types/IOrderData';
import ICustomer from '../../../types/ICustomer';
import IAddressData from '../../../types/IAddressData';

import { DataPageContainer } from './styles';

interface IDataPageProps {
  handleUpdateOrderData(data: IOrderData): Promise<void>;
  selectedCustomer: ICustomer | undefined;
  totalPrice: number;
  handleAppyDiscount(updatedPriceBase: number): void;
  priceBase: number;
  handleUpdateCustomerAddress(street: string, area: string, city: string): void;
}

const DataPage: React.FC<IDataPageProps> = ({
  handleUpdateOrderData,
  selectedCustomer,
  totalPrice,
  handleAppyDiscount,
  priceBase,
  handleUpdateCustomerAddress,
}) => {
  const breakpoints = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [addressUpdate, setAddressUpdate] = useState<boolean>(false);
  const [isEstimate, setIsEstimate] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();

  const { updateCustomerAddress } = useCustomer();
  const { user } = useAuth();

  const options = {
    areaOptions: areas.sort().map((area: string) => {
      return {
        value: area,
        label: area,
      };
    }),
  };

  const handleSubmitDataPage = useCallback(
    async (allOrderData: Omit<IOrderData, 'seller'>) => {
      // Uses authenticated user as seller
      const seller = user.name;

      if (!allOrderData.ps) {
        // eslint-disable-next-line no-param-reassign
        allOrderData.ps = undefined;
      }

      if (!allOrderData.delivery_type) {
        // eslint-disable-next-line no-param-reassign
        allOrderData.delivery_type = 'Retirar na Loja';
      }

      if (!allOrderData.paymentStatus) {
        // eslint-disable-next-line no-param-reassign
        allOrderData.paymentStatus = 'Receber na Entrega';
      }

      handleUpdateOrderData({ ...allOrderData, seller, deliveryDate });
    },
    [addressUpdate, deliveryDate],
  );

  const handleSubmitCustomerAddress = useCallback(
    async (addressData: IAddressData) => {
      if (selectedCustomer?.id) {
        await updateCustomerAddress(addressData, selectedCustomer.id);

        handleUpdateCustomerAddress(
          addressData.street,
          addressData.area,
          addressData.city,
        );
      }

      setAddressUpdate(false);
    },
    [addressUpdate, selectedCustomer],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onChangeDate(_: any, dateString: string) {
    const date = new Date(dateString);

    date.setDate(date.getDate() + 1);

    setDeliveryDate(date);
  }

  return (
    <DataPageContainer>
      <Typography.Title
        level={3}
        style={{
          textAlign: 'center',
          marginBottom: breakpoints.sm ? '32px' : '16px',
        }}
      >
        Dados do pedido
      </Typography.Title>
      <Form
        onFinish={handleSubmitDataPage}
        form={form}
        name="control-hooks"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        style={{ textAlign: 'left' }}
      >
        <Form.Item
          label="Tipo do pedido"
          name="orderStatus"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, selecione o tipo do pedido!',
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button
              value="Em Produção"
              onClick={() => setIsEstimate(false)}
            >
              Produção
            </Radio.Button>
            <Radio.Button value="Orçamento" onClick={() => setIsEstimate(true)}>
              Orçamento
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Loja do pedido"
          name="orderStore"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, selecione a loja do pedido!',
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="Frade">Frade</Radio.Button>
            <Radio.Button value="Japuiba">Japuíba</Radio.Button>
            <Radio.Button value="São João de Meriti">
              São João de Meriti
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Tipo de Entrega"
          name="delivery_type"
          required={false}
        >
          <Radio.Group disabled={!!isEstimate}>
            <Radio.Button
              value="Entrega"
              onClick={() =>
                selectedCustomer?.street === 'Endereço não informado'
                  ? setAddressUpdate(true)
                  : setAddressUpdate(false)
              }
            >
              Entrega
            </Radio.Button>
            <Radio.Button
              value="Retirar na Loja"
              onClick={() => setAddressUpdate(false)}
            >
              Retirar na Loja
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tipo de pagamento" name="paymentStatus">
          <Radio.Group disabled={!!isEstimate}>
            <Radio.Button value="Pago">Pago</Radio.Button>
            <Radio.Button value="Parcialmente Pago">
              Parcialmente Pago
            </Radio.Button>
            <Radio.Button value="Receber na Entrega">Receber</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Data de Entrega">
          <DatePicker onChange={onChangeDate} disabled={!!isEstimate} />
        </Form.Item>
        <Form.Item name="ps" label="Observações">
          <Input disabled={!!isEstimate} />
        </Form.Item>
        <Form.Item label="Desconto">
          <Radio.Group
            onChange={(event) => handleAppyDiscount(event.target.value)}
            defaultValue={priceBase}
          >
            <Radio.Button value={75}>Balcão</Radio.Button>
            <Radio.Button value={50}>Marceneiro</Radio.Button>
            <Radio.Button value={1}>Sem acréscimo</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Typography.Title
          level={5}
          style={{ marginTop: '16px', color: '#009966', textAlign: 'center' }}
        >
          {`Valor: R$ ${totalPrice},00`}
        </Typography.Title>

        <AntButton
          block
          htmlType="submit"
          type="primary"
          disabled={!!addressUpdate}
          style={{ marginTop: '16px' }}
        >
          Confirmar
        </AntButton>
      </Form>
      {addressUpdate && (
        <Form
          onFinish={handleSubmitCustomerAddress}
          form={addressForm}
          name="control-hooks"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          labelAlign="left"
          style={{ marginTop: '16px', marginBottom: '64px', textAlign: 'left' }}
        >
          <Typography.Title
            level={5}
            type="danger"
            style={{
              marginTop: '32px',
              marginBottom: '32px',

              textAlign: 'center',
            }}
          >
            Endereço do cliente não fornecido. Atualize para continuar...
          </Typography.Title>
          <Form.Item
            name="street"
            label="Endereço"
            rules={[
              {
                required: true,
                message: 'Por favor, digite um endereço!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bairro"
            name="area"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione um bairro!',
              },
            ]}
          >
            <Select showSearch>
              {options.areaOptions.map((area) => (
                <Select.Option value={area.value}>{area.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Cidade"
            name="city"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione a cidade!',
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="Angra dos Reis">Angra dos Reis</Radio.Button>
              <Radio.Button value="Paraty">Paraty</Radio.Button>
              <Radio.Button value="Rio de Janeiro">Rio de Janeiro</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <AntButton block htmlType="submit" type="primary">
            Atualizar endereço
          </AntButton>
        </Form>
      )}
    </DataPageContainer>
  );
};

export default DataPage;
