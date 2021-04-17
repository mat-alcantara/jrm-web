import React, { useCallback } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import { Menu } from 'antd';
import { useAuth } from '../../../hooks/Auth';

import { StyledHeader, StyledMenu } from './styles';

const { SubMenu, Item } = Menu;

interface AntHeaderProps {
  selectedPage: string;
}

const AntHeader: React.FC<AntHeaderProps> = ({ selectedPage }) => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <StyledHeader>
      <h1>JRM Compensados</h1>
      <StyledMenu
        mode="horizontal"
        defaultSelectedKeys={[selectedPage]}
        overflowedIndicator={<FiMenu size={20} />}
      >
        <Item key="Novo serviço">Novo serviço</Item>
        <SubMenu title="Cortes">
          <Item key="Em produção">Em produção</Item>
          <Item key="Liberados para transporte">Liberados para transporte</Item>
          <Item key="Concluídos">Concluídos</Item>
          <Item key="Orçamentos">Orçamentos</Item>
          <Item key="Todos os cortes">Todos os cortes</Item>
        </SubMenu>
        <SubMenu title="Clientes">
          <Item key="Novo cliente">Novo cliente</Item>
          <Item key="Todos os clientes">Todos os clientes</Item>
        </SubMenu>
        <SubMenu icon={<FiUser size={20} style={{ margin: '0 auto' }} />}>
          <Item key="Ajustes">Ajustes</Item>
          <Item key="Sair" onClick={handleLogOut}>
            Sair
          </Item>
        </SubMenu>
      </StyledMenu>
    </StyledHeader>
  );
};

export default AntHeader;
