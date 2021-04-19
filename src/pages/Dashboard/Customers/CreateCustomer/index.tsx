/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
import React, { useRef, useState } from 'react';
import { FormHandles } from '@unform/core'; // List of props for form reference

import { Form } from '@unform/web';
import { Container } from './styles';

import AntDashboard from '../../../../components/AntDashboard';
import AntContent from '../../../../components/AntContent';

import AntInput from '../../../../components/AntInput';
import AntButton from '../../../../components/AntButton';
import ReactSelect from '../../../../components/ReactSelect';

import api from '../../../../services/api';
import normalizeTelephoneInput from '../../../../utils/normalizeTelephoneInput';

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

  const [phone, setPhone] = useState('');

  const handleChange = (value: string) => {
    setPhone((prevValue: string): string =>
      normalizeTelephoneInput(value, prevValue),
    );
  };

  const handleSubmit = async ({
    name,
    email,
    area,
    city,
    tel,
  }: ISubmitData) => {
    const telephone = tel.replace(/[^A-Z0-9]/gi, '');
    console.log(telephone);
    const state = 'RJ';

    await api.post('/customers', {
      name,
      email,
      area,
      city,
      state,
      tel,
    });
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Crie um novo cliente</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AntInput size="large" name="name" placeholder="Nome completo" />
            <AntInput size="large" name="email" placeholder="Email" />
            <AntInput
              size="large"
              name="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => handleChange(e.target.value)}
            />
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
