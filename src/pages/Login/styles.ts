import styled from 'styled-components';
import LogInBackground from '../../assets/LogInBackground.jpg';

export const Container = styled.div`
  height: 100vh; // Container terá 100% da parte visível da tela

  display: flex; // Itens um ao lado do outro
  align-items: stretch; // Faz com que os itens tenham height de 100vh também
`;

export const Content = styled.div`
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

  form {
    margin: 80px 0px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1; // Ocupa todo o espaço restante, menos os 700 mínimos do Content
  background: url(${LogInBackground}) no-repeat center;
`;
