import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => (
  <Container>
    <Content>
      <img src={Logo} alt="JRM Compensados" />
      <form>
        <h1>Faça o seu login</h1>
        <Input name="E-mail" icon={FiMail} type="text" placeholder="E-mail" />
        <Input
          name="Password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Content>
    <Background />
  </Container>
);

export default Login;
