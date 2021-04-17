import React from 'react';
import { Layout } from 'antd';

import AntHeader from '../../components/AntHeader';
import AntFooter from '../../components/AntFooter';

import './styles.css';

const Dashboard: React.FC = () => {
  const { Content } = Layout;

  return (
    <Layout className="layout" style={{ height: '100%', minHeight: '100vh' }}>
      <AntHeader />
      <Content style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div className="site-layout-content">
          <h1>Novo corte</h1>
        </div>
      </Content>
      <AntFooter />
    </Layout>
  );
};

export default Dashboard;
