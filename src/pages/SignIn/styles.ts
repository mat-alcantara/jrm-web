import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { Card } from 'antd';
import LogInBackground from '../../assets/LogInBackground.jpg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0px)
  }
`;

export const Container = styled.div`
  height: 100vh; // Container terá 100% da parte visível da tela

  display: flex; // Itens um ao lado do outro
  align-items: stretch; // Faz com que os itens tenham height de 100vh também
`;

export const Content = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  img {
    height: 180px;
    width: 340px;
    margin: 0 auto; // Centraliza a imagem de logotipo
  }
`;

export const Background = styled.div`
  flex: 1; // Ocupa todo o espaço restante, menos os 700 mínimos do Content
  background: url(${LogInBackground}) no-repeat center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0px 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 16px;
    }

    > span {
      margin-bottom: 8px;
    }

    button {
      margin-top: 8px;
    }
  }

  > a {
    color: #b46530;
    display: block;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    font-weight: 500;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#b46530')};
    }
  }
`;
