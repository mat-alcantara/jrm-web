import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Divider } from 'antd';
import { Form } from '@unform/web';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import {
  CustomerList,
  Container,
  OrderContainer,
  CutlistContainer,
} from './styles';

import AntInput from '../../components/AntInput';
import AntSelect from '../../components/ReactSelect';
import AntInputNumber from '../../components/AntInputNumber';
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
  created_at: string;
  updated_at: string;
}

const orderOptions = {
  orderStore: [
    { value: 'Japuíba', label: 'Japuíba' },
    { value: 'Frade', label: 'Frade' },
    { value: 'São João de Meriti', label: 'São João de Meriti' },
  ],
  orderStatus: [
    { value: 'Em Produção', label: 'Para Produzir' },
    { value: 'Orçamento', label: 'Orçamento' },
  ],
  paymentType: [
    { value: 'Pago', label: 'Pago' },
    { value: 'Parcialmente Pago', label: 'Parcialmente Pago' },
    { value: 'Receber na Entrega', label: 'Receber na Entrega' },
  ],
};

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomersProps>();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);

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

  const handleSelectedCustomer = useCallback(
    (value: string, option) => {
      const customerSelectedByAutocomplete = allCustomers.find(
        (customer) => customer.id === option.id,
      );

      setSelectedCustomer(customerSelectedByAutocomplete);
    },
    [allCustomers, selectedCustomer],
  );

  const handleSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Selecione um cliente</h1>
          <AutoComplete
            options={autoCompleteOptions}
            style={{ width: 400 }}
            placeholder="Digite o nome do cliente"
            onSelect={handleSelectedCustomer}
          />
          {selectedCustomer && (
            <CustomerList>
              <span>{`Cliente: ${selectedCustomer.name}`}</span>
              <span>
                {`Endereço: ${selectedCustomer.street}, ${selectedCustomer.area}, ${selectedCustomer.city}`}
              </span>
              <span>{`Telefone: ${selectedCustomer.telephone[0]}`}</span>
            </CustomerList>
          )}
          <Divider />
          <h1>Dados do pedido</h1>
          <OrderContainer>
            <Form onSubmit={handleSubmit}>
              <AntInput name="seller" placeholder="Vendedor" size="large" />

              <AntSelect
                name="orderStore"
                placeholder="Loja do pedido"
                options={orderOptions.orderStore}
              />
              <AntSelect
                name="orderStatus"
                placeholder="Tipo de pedido"
                options={orderOptions.orderStatus}
              />
              <AntSelect
                name="paymentStatus"
                placeholder="Tipo de pagamento"
                options={orderOptions.paymentType}
              />
              <AntInput name="ps" placeholder="Observações" size="large" />

              <CutlistContainer>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <AntInput
                    name="material"
                    placeholder="Material"
                    style={{
                      textAlign: 'center',
                      marginRight: '8px',
                    }}
                  />
                  <p style={{ width: '150px' }}>R$ 500,00</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <AntInputNumber
                    name="quantidade"
                    placeholder="Qtd"
                    style={{ flex: '1' }}
                  />
                  <AntInputNumber
                    name="side_a_size"
                    maxLength={4}
                    placeholder="Lado A"
                  />
                  <AntInputNumber
                    name="side_a_border"
                    placeholder="Fita A"
                    maxLength={1}
                  />
                  <AntInputNumber
                    name="side_b_size"
                    maxLength={4}
                    placeholder="Lado B"
                  />
                  <AntInputNumber
                    name="side_b_border"
                    maxLength={1}
                    placeholder="Fita B"
                  />
                </div>
                <AntButton block type="link" style={{ marginTop: '8px' }}>
                  Remover
                </AntButton>
              </CutlistContainer>

              <AntButton block type="primary" htmlType="submit">
                Criar
              </AntButton>
            </Form>
          </OrderContainer>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;