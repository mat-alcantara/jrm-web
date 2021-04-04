/* eslint-disable no-console */
import React, { useCallback } from 'react';
// eslint-disable-next-line object-curly-newline
import { Formik, Form, Field } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface submitProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const handleSubmit = useCallback(async ({ email, password }: submitProps) => {
    try {
      const loginData = await api.post('/session', { email, password });

      const { token } = loginData.data;
      const { user } = loginData.data;

      console.log(token, user);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={Logo} alt="JRM Compensados" />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <h1>Faça o seu login</h1>
            <Field
              as={Input}
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Field
              as={Input}
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>
        </Formik>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
