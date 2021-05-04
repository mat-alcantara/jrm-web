import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { CustomerProvider } from './Customer';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CustomerProvider>{children}</CustomerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
