/* eslint-disable no-console */
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'; // List of props for form reference
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
// import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface submitProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const validateLoginProps = useCallback(
    async ({ email, password }: submitProps) => {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().min(6, 'Senha deve ter pelo menos 6 dígitos'),
      });

      const isPropsValid = await schema.validate(
        { email, password },
        {
          // Faz com que todos os erros sejam pegos pelo catch
          abortEarly: false,
        },
      );

      return isPropsValid;
    },
    [],
  );

  const handleSubmit = useCallback(
    async ({ email, password }: submitProps) => {
      try {
        formRef.current?.setErrors({});

        await validateLoginProps({ email, password });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [validateLoginProps],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="JRM Compensados" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça o seu login</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
