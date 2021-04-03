import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const Login: React.FC = () => (
  <Container>
    <Content>
      <img src={Logo} alt="JRM Compensados" />
      <form>
        <h1>Faça o seu login</h1>
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">
          <FiLogIn id="LogInIcon" />
          Entrar
        </button>
      </form>
    </Content>
    <Background />
  </Container>
);

export default Login;
