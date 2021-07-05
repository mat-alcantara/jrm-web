import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { CustomerProvider } from './Customer';
import { MaterialProvider } from './Material';
import { OrderProvider } from './Order';
import { CortecloudProvider } from './Cortecloud';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CustomerProvider>
        <MaterialProvider>
          <OrderProvider>
            <CortecloudProvider>{children}</CortecloudProvider>
          </OrderProvider>
        </MaterialProvider>
      </CustomerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
