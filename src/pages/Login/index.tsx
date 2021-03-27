import React from 'react';

import { Container } from './styles';

const Login: React.FC = () => (
  <Container>
    <form>
      <h1>Login</h1>

      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Entrar</button>
    </form>
  </Container>
);

export default Login;
