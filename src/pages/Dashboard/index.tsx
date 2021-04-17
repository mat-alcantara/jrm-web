import React, { useCallback } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { FiMenu, FiUser } from 'react-icons/fi';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/Auth';

import Logo from '../../assets/logo.svg';

import './styles.css';

const { Header, Footer } = Layout;
const { SubMenu, Item } = Menu;

const Dashboard: React.FC = () => {
  const { Content } = Layout;
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{ color: '#b46530' }}>JRM Compensados</h1>
        <Menu
          style={{
            marginLeft: '300px;',
          }}
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
            <Item key="8">Todos os clientes</Item>
          </SubMenu>
          <SubMenu icon={<UserOutlined style={{ margin: '0 auto' }} />}>
            <Item key="9">Ajustes</Item>
            <Item key="10" onClick={handleLogOut}>
              Sair
            </Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb style={{ margin: '16px 0', textAlign: 'center' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item onClick={handleLogOut}>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        JRM Compensados ©2021 Created by Mateus Alcantara
      </Footer>
    </Layout>
  );
};

export default Dashboard;
