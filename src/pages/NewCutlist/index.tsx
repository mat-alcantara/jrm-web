import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Divider, Steps } from 'antd';
import { Form } from '@unform/web';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';
import { Container, CustomerPageContainer, StepsContainer } from './styles';

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

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');
  const { Step } = Steps;
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
  };

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; id: string }[]
  >([]);
  const [allCustomers, setAllCustomers] = useState<ICustomersProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomersProps>();
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
        <h1>Selecione um cliente</h1>
        <div>
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
        </div>
        {selectedCustomer && <p>{selectedCustomer.name}</p>}
      </CustomerPageContainer>
    );
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          {page === 1 && <CustomerPage />}
          <StepsContainer>
            <Divider />
            <Steps current={page - 1}>
              <Step title="Cliente" description="Selecione um cliente" />
              <Step title="Dados" description="Forneça os dados do pedido" />
              <Step title="Peças" description="Forneça a lista de peças" />
            </Steps>
            <Divider />
          </StepsContainer>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;
