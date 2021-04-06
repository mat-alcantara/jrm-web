import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleLogOut}>
        Sair
      </button>
    </>
  );
};

export default Dashboard;
