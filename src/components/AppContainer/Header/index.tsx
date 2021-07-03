import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { Menu, Typography, Grid, Row, Col } from 'antd';

import { useAuth } from '../../../hooks/Auth';

import { Container } from './styles';

const { SubMenu, Item } = Menu;

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const breakpoints = Grid.useBreakpoint();

  const handleLogOut = useCallback(async () => {
    signOut();
  }, []);

  return (
    <Container>
      <Row align="middle" justify="space-between">
        <Col
          xl={5}
          lg={7}
          xs={21}
          style={{
            textAlign: breakpoints.sm ? 'left' : 'center',
          }}
        >
          <Typography.Title level={breakpoints.sm ? 3 : 4}>
            <Link to="/">JRM Compensados</Link>
          </Typography.Title>
        </Col>
        <Col
          lg={17}
          xl={19}
          xs={3}
          style={{
            display: 'flex',
            justifyContent: breakpoints.sm ? 'flex-end' : 'flex-start',
          }}
        >
          <Menu
            mode="horizontal"
            triggerSubMenuAction={breakpoints.sm ? 'hover' : 'click'}
            overflowedIndicator={<FiMenu />}
          >
            <Item>
              <Link to="/dashboard">Dashboard</Link>
            </Item>
            <Item>
              <Link to="/newcutlist">Novo serviço</Link>
            </Item>
            <SubMenu title="Pedidos">
              <Item>
                <Link to="/orders/producao">Em Produção</Link>
              </Item>
              <Item>
                <Link to="/orders/liberado-para-transporte">
                  Liberados para Transporte
                </Link>
              </Item>
              <Item>
                <Link to="/orders/transportado">Transportados</Link>
              </Item>
              <Item>
                <Link to="/orders/entregue">Entregues</Link>
              </Item>
              <Item>
                <Link to="/orders/orcamento">Orçamentos</Link>
              </Item>
              <Item>
                <Link to="/orders/todas">Todos os pedidos</Link>
              </Item>
            </SubMenu>

            <SubMenu title="Clientes">
              <Item>
                <Link to="/newcustomer">Novo cliente</Link>
              </Item>
              <Item>
                <Link to="/customerslist">Todos os clientes</Link>
              </Item>
            </SubMenu>
            {user.userType === 'production' && (
              <SubMenu title="Materiais">
                <Item>
                  <Link to="/newmaterial">Novo material</Link>
                </Item>
                <Item>
                  <Link to="/materialslist">Todos os materiais</Link>
                </Item>
              </SubMenu>
            )}

            <Item onClick={handleLogOut}>Sair</Item>
          </Menu>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
