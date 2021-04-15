import React, { useCallback } from 'react';
import { Layout } from 'antd';

import AntHeader from '../../components/AntHeader';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { Sider, Content, Footer } = Layout;
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <Layout>
      <AntHeader />
      <Layout>
        <Sider width={200}>left sidebar</Sider>
        <Content>
          <button type="button" onClick={handleLogOut}>
            Sair
          </button>
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default Dashboard;
