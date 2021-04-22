import React from 'react';
import { Layout } from 'antd';

import AntDashboard from '../../components/AntDashboard';

const Dashboard: React.FC = () => {
  const { Content } = Layout;

  return (
    <AntDashboard>
      <Content style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div className="site-layout-content">
          <h1>Dashboard</h1>
        </div>
      </Content>
    </AntDashboard>
  );
};

export default Dashboard;
