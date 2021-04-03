/* eslint-disable no-console */
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Formik, Form, Field } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => (
  <Container>
    <Content>
      <img src={Logo} alt="JRM Compensados" />
      <Formik
        initialValues={{ email: '312', password: '321' }}
        onSubmit={(values) => console.log(values)}
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
export default Login;
