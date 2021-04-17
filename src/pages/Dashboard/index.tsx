import React from 'react';
import { Layout } from 'antd';

import AntDashboard from '../../components/AntDashboard';

import './styles.css';

const Dashboard: React.FC = () => {
  const { Content } = Layout;

  return (
    <AntDashboard whereIAm="Novo cliente">
      <Content style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div className="site-layout-content">
          <h1>Novo corte</h1>
        </div>
      </Content>
    </AntDashboard>
  );
};

export default Dashboard;
