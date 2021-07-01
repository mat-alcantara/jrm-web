import React, { useRef, useState, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Typography } from 'antd';
import AppContainer from '../../components/AppContainer';

import { useCustomer } from '../../hooks/Customer';
import getValidationErrors from '../../utils/getValidationErrors';
import normalizeTelephoneInput from '../../utils/normalizeTelephoneInput';
import { areas } from '../../utils/listOfAreas';

import { Container } from './styles';

import AntInput from '../../components/AntInput';
import AntButton from '../../components/AntButton';
import ReactSelect from '../../components/ReactSelect';

interface ISubmitData {
  firstname: string;
  lastname: string;
  email?: string;
  tel: string;
  street: string;
  area: string;
  city: string;
  state?: string;
}

const CreateCustomer: React.FC = () => {
  const { createCustomer } = useCustomer();

  const options = {
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

  const formRef = useRef<FormHandles>(null);

  const [phone, setPhone] = useState('');

  const validateCustomerProps = useCallback(
    async (validationData: ISubmitData) => {
      const schema = Yup.object().shape({
        firstname: Yup.string().required('Nome obrigatório'),
        lastname: Yup.string().required(
          'Sobrenome obrigatório. São as regras do banco de dados ¯\\_(ツ)_/¯',
        ),
        email: Yup.string().email('Digite um e-mail válido'),
        tel: Yup.string()
          .required('Telefone obrigatório')
          .min(10, 'Numero de telefone deve conter entre 10 e 11 números'),
        area: Yup.string().required('Bairro obrigatório'),
        street: Yup.string(),
        city: Yup.string().required('Cidade obrigatória'),
        state: Yup.string().required('UF obrigatório'),
      });

      const isPropsValid = await schema.validate(validationData, {
        abortEarly: false,
      });

      return isPropsValid;
    },
    [],
  );

  const handleSubmit = useCallback(
    async ({
      firstname,
      lastname,
      email,
      tel,
      area,
      street,
      city,
    }: ISubmitData) => {
      const capitalizeAndStrip = (input: string) => {
        if (input) {
          const updatedInput = input
            .replace(/\S+/g, (txt) => {
              // uppercase first letter and add rest unchanged
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
            .trim();

          return updatedInput;
        }

        return input;
      };

      // const name = `${capitalizeAndStrip(`${firstname} ${lastname}`)}`;
      const name = `${capitalizeAndStrip(firstname)} ${capitalizeAndStrip(
        lastname,
      )}`;

      const telephone = tel.replace(/[^A-Z0-9]/gi, '');
      const state = 'Rio de Janeiro';
      const emailHandled = email || undefined; // Empty email returns undefined
      let handledStreet;

      if (!street) {
        handledStreet = 'Endereço não informado';
      } else {
        handledStreet = street;
      }

      try {
        await validateCustomerProps({
          firstname,
          lastname,
          email: emailHandled,
          tel: telephone,
          area,
          street,
          state,
          city,
        });

        await createCustomer({
          name,
          email: emailHandled,
          telephone: [telephone],
          area,
          street: handledStreet,
          state,
          city,
        });
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
    <AppContainer>
      <Container>
        <Typography.Title level={3}>Crie um novo cliente</Typography.Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AntInput size="large" name="firstname" placeholder="Nome" />
          <AntInput size="large" name="lastname" placeholder="Sobrenome" />
          <AntInput size="large" name="email" placeholder="Email" />
          <AntInput
            size="large"
            name="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) =>
              setPhone((prevValue: string): string =>
                normalizeTelephoneInput(e.target.value, prevValue),
              )
            }
          />
          <AntInput size="large" name="street" placeholder="Endereço" />
          <ReactSelect
            placeholder="Bairro"
            name="area"
            options={options.areaOptions}
          />
          <ReactSelect
            placeholder="Cidade"
            name="city"
            options={options.cityOptions}
          />

          <AntButton block type="primary" htmlType="submit">
            Criar
          </AntButton>
        </Form>
      </Container>
    </AppContainer>
  );
};

export default CreateCustomer;
