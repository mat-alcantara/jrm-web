import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { CustomerProvider } from './Customer';
import { MaterialProvider } from './Material';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CustomerProvider>
        <MaterialProvider>{children}</MaterialProvider>
      </CustomerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
