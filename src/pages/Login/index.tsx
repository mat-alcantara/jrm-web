import React from 'react';
import Logo from '../../assets/logo.svg';

const Login: React.FC = () => (
  <>
    <img src={Logo} alt="JRM Compensados" />
    <h1>Faça o seu Login</h1>
    <form>
      <input type="text" placeholder="Digite o seu email" />
      <input type="text" placeholder="Digite a sua senha" />
      <button type="submit">Entrar</button>
    </form>
  </>
);

export default Login;
