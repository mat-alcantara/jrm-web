/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import { Input, Button } from 'antd';
import { Container, Content } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Content bordered>
        <h1>Faça o seu login</h1>
        <Input autoFocus type="email" placeholder="E-mail" size="middle" />
        <Input.Password placeholder="Password" />
        <Button block type="primary">
          Entrar
        </Button>
      </Content>
    </Container>
  );
};

export default SignUp;
