import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { CustomerProvider } from './Customer';
import { MaterialProvider } from './Material';
import { OrderProvider } from './Order';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CustomerProvider>
        <MaterialProvider>
          <OrderProvider>{children}</OrderProvider>
        </MaterialProvider>
      </CustomerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
