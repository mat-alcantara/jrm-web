import React from 'react';
import { Formik, Form } from 'formik';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

const Login: React.FC = () => (
  <Container>
    <Formik
      initialValues={{
        email: 'teste',
        password: 'teste',
      }}
      onSubmit={(value) => {
        // eslint-disable-next-line no-console
        console.log('ok', value);
      }}
    />
    <Form>
      <img src={Logo} alt="JRM Compensados" />
      <h1>Faça o seu Login</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Digite o seu email"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Digite a sua senha"
      />
      <button type="submit">Entrar</button>
    </Form>
  </Container>
);

export default Login;
