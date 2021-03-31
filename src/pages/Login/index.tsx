import React from 'react';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

const Login: React.FC = () => (
  <Container>
    <form>
      <img src={Logo} alt="JRM Compensados" />
      <h1>Faça o seu Login</h1>
      <input type="text" name="email" placeholder="Digite o seu email" />
      <input type="password" name="password" placeholder="Digite a sua senha" />
      <button type="submit">Entrar</button>
    </form>
  </Container>
);

export default Login;
