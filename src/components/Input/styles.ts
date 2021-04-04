import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: #7f3803;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #7f3803; // Border para quando tiver erro mudar a cor
  padding: 16px;
  width: 100%;
  color: #fff;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1; // Ocupa todo o espaço possivel do container

    color: #fff;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #fff;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
