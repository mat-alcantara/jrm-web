import React from 'react';
import { Menu } from 'antd';

import Logo from '../../assets/logo.svg';

import { StyledHeader } from './styles';

const AntHeader: React.FC = () => {
  return (
    <StyledHeader>
      <img src={Logo} alt="" />
      <Menu mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Novo Serviço</Menu.Item>
        <Menu.Item key="2">Cortes</Menu.Item>
        <Menu.Item key="3">Clientes</Menu.Item>
      </Menu>
    </StyledHeader>
  );
};

export default AntHeader;
