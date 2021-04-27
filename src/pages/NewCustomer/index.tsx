/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
import React, { useRef, useState, useCallback } from 'react';
import { FormHandles } from '@unform/core'; // List of props for form reference
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntInput from '../../components/AntInput';
import AntButton from '../../components/AntButton';
import ReactSelect from '../../components/ReactSelect';

import api from '../../services/api';
import normalizeTelephoneInput from '../../utils/normalizeTelephoneInput';
import { areas } from '../../utils/listOfAreas';

const areaOptions = areas.sort().map((area: string) => {
  return {
    value: area,
    label: area,
  };
});

const cityOptions = [
  { value: 'Angra dos Reis', label: 'Angra dos Reis' },
  { value: 'Paraty', label: 'Paraty' },
  { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
];

interface ISubmitData {
  name: string;
  email?: string;
  tel: string;
  street: string;
  area: string;
  city: string;
  state?: string;
}

const CreateCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [phone, setPhone] = useState('');

  const history = useHistory();
  const token = localStorage.getItem('@JRMCompensados:token');

  const validateCustomerProps = useCallback(
    async ({ name, email, tel, street, area, city, state }: ISubmitData) => {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().email('Digite um e-mail válido'),
        tel: Yup.string()
          .required('Telefone obrigatório')
          .min(10, 'Numero de telefone deve conter entre 10 e 11 números'),
        area: Yup.string().required('Bairro obrigatório'),
        street: Yup.string().required('Endereço obrigatório'),
        city: Yup.string().required('Cidade obrigatória'),
        state: Yup.string().required('UF obrigatório'),
      });

      const isPropsValid = await schema.validate(
        { name, email, tel, street, area, city, state },
        {
          // Faz com que todos os erros sejam pegos pelo catch
          abortEarly: false,
        },
      );

      return isPropsValid;
    },
    [],
  );

  const handleChange = (value: string) => {
    setPhone((prevValue: string): string =>
      normalizeTelephoneInput(value, prevValue),
    );
  };

  const handleSubmit = useCallback(
    async ({ name, email, tel, area, street, city }: ISubmitData) => {
      const telephone = tel.replace(/[^A-Z0-9]/gi, '');
      const state = 'Rio de Janeiro';

      try {
        await validateCustomerProps({
          name,
          email,
          tel: telephone,
          area,
          street,
          state,
          city,
        });

        await api.post(
          '/customers',
          {
            name,
            email,
            telephone: [telephone],
            area,
            street,
            state,
            city,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        addToast({
          type: 'success',
          title: 'Cliente cadastrado com sucesso',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [validateCustomerProps, getValidationErrors],
  );

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
            <AntInput size="large" name="street" placeholder="Endereço*" />
            <ReactSelect
              placeholder="Bairro"
              name="area"
              options={areaOptions}
            />
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
