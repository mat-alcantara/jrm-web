import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { Menu, Typography } from 'antd';

import { useAuth } from '../../hooks/Auth';

import { Container } from './styles';

const { SubMenu, Item } = Menu;

const Header: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    signOut();
  }, []);

  return (
    <Container>
      <Link to="/">
        <Typography.Title level={3}>JRM Compensados</Typography.Title>
      </Link>
      <Menu
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
      </Menu>
    </Container>
  );
};

export default Header;
