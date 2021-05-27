import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { useMaterial } from '../../hooks/Material';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntInput from '../../components/AntInput';
import AntInputNumber from '../../components/AntInputNumber';
import AntButton from '../../components/AntButton';

interface IFormData {
  name: string;
  width: number;
  height: number;
  price: number;
}

const NewMaterial: React.FC = () => {
  const { createMaterial } = useMaterial();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const validateCustomerProps = useCallback(
    async ({ name, price, width, height }: IFormData) => {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        price: Yup.number()
          .typeError('Valor precisa ser um número')
          .required('Preço obrigatório'),
        width: Yup.number()
          .typeError('Valor precisa ser um número')
          .required('Largura obrigatória')
          .max(2750),
        height: Yup.number()
          .typeError('Valor precisa ser um número')
          .required('Altura obrigatória')
          .max(1850),
      });

      const isPropsValid = await schema.validate(
        { name, price, width, height },
        {
          // Faz com que todos os erros sejam pegos pelo catch
          abortEarly: false,
        },
      );

      return isPropsValid;
    },
    [],
  );

  const handleFormSubmit = useCallback(
    async ({ name, price, width, height }: IFormData) => {
      try {
        await validateCustomerProps({ name, price, width, height });

        await createMaterial({
          name,
          price,
          width,
          height,
        });

        history.push('/materialslist');
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
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Crie um novo material</h1>
          <Form onSubmit={handleFormSubmit} ref={formRef}>
            <AntInput name="name" placeholder="Material" />
            <div>
              <AntInputNumber name="price" placeholder="Preço" />
              <AntInputNumber name="width" placeholder="Largura" />
              <AntInputNumber name="height" placeholder="Altura" />
            </div>
            <AntButton htmlType="submit" type="primary" block>
              Criar
            </AntButton>
          </Form>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewMaterial;
