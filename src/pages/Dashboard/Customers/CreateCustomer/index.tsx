/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
import React, { useRef } from 'react';
import { FormHandles } from '@unform/core'; // List of props for form reference

import { Form } from '@unform/web';
import { Container } from './styles';

import AntDashboard from '../../../../components/AntDashboard';
import AntContent from '../../../../components/AntContent';

import AntInput from '../../../../components/AntInput';
import AntButton from '../../../../components/AntButton';
import ReactSelect from '../../../../components/ReactSelect';

const cityOptions = [
  { value: 'angra dos reis', label: 'Angra dos Reis' },
  { value: 'paraty', label: 'Paraty' },
  { value: 'são joão de meriti', label: 'São João de Meriti' },
];

interface ISubmitData {
  name: string;
  email: string;
  tel: string;
  area: string;
  city: string;
  state: string;
}

const CreateCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = ({ name, email, area, city, tel }: ISubmitData) => {
    const state = 'RJ';
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Crie um novo cliente</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AntInput size="large" name="name" placeholder="Nome completo" />
            <AntInput size="large" name="email" placeholder="Email" />
            <AntInput size="large" name="tel" placeholder="Telefone" />
            <AntInput size="large" name="area" placeholder="Bairro" />
            <ReactSelect
              placeholder="Cidade"
              name="city"
              options={cityOptions}
            />

            <AntButton block type="primary" htmlType="submit">
              Criar
            </AntButton>
          </Form>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CreateCustomer;
