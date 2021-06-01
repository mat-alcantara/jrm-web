import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { Menu } from 'antd';

import { useAuth } from '../../../hooks/Auth';

import { StyledHeader, StyledMenu } from './styles';

const { SubMenu, Item } = Menu;

const AntHeader: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <StyledHeader>
      <Link to="/">
        <h1>JRM Compensados</h1>
      </Link>
      <StyledMenu
        mode="horizontal"
        triggerSubMenuAction="click"
        overflowedIndicator={<FiMenu size={20} />}
      >
        <Item>
          <Link to="/dashboard">Dashboard</Link>
        </Item>
        <Item>
          <Link to="/newcutlist">Novo serviço</Link>
        </Item>
        <Item>
          <Link to="/allorders">Cortes</Link>
        </Item>
        {/* <SubMenu title="Cortes">
          <Item>Em produção</Item>
          <Item>Liberados para transporte</Item>
          <Item>Concluídos</Item>
          <Item>Orçamentos</Item>
          <Item>
            <Link to="/allorders">Todos os cortes</Link>
          </Item>
        </SubMenu> */}
        <SubMenu title="Clientes">
          <Item>
            <Link to="/newcustomer">Novo cliente</Link>
          </Item>
          <Item>
            <Link to="/customerslist">Todos os clientes</Link>
          </Item>
        </SubMenu>
        <SubMenu title="Materiais">
          <Item>
            <Link to="/newmaterial">Novo material</Link>
          </Item>
          <Item>
            <Link to="/materialslist">Todos os materiais</Link>
          </Item>
        </SubMenu>
        <Item onClick={handleLogOut}>Sair</Item>
        {/* <SubMenu icon={<FiUser size={20} style={{ margin: '0 auto' }} />}>
          <Item>Ajustes</Item>
          <Item onClick={handleLogOut}>Sair</Item>
        </SubMenu> */}
      </StyledMenu>
    </StyledHeader>
  );
};

export default AntHeader;
