import React, { useCallback } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import { Menu } from 'antd';
import { useAuth } from '../../hooks/Auth';

import { StyledHeader, StyledMenu } from './styles';

const { SubMenu, Item } = Menu;

const AntHeader: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <StyledHeader>
      <h1>JRM Compensados</h1>
      <StyledMenu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        overflowedIndicator={<FiMenu size={20} />}
      >
        <Item key="1">Novo serviço</Item>
        <SubMenu title="Cortes">
          <Item key="2">Em produção</Item>
          <Item key="3">Liberados para transporte</Item>
          <Item key="4">Concluídos</Item>
          <Item key="5">Orçamentos</Item>
          <Item key="6">Todos os cortes</Item>
        </SubMenu>
        <SubMenu title="Clientes">
          <Item key="7">Novo cliente</Item>
        </SubMenu>
        <SubMenu icon={<FiUser size={20} style={{ margin: '0 auto' }} />}>
          <Item key="8">Ajustes</Item>
          <Item key="9" onClick={handleLogOut}>
            Sair
          </Item>
        </SubMenu>
      </StyledMenu>
    </StyledHeader>
  );
};

export default AntHeader;
