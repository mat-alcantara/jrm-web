/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';

import IOrderStatus from '../types/OrderStatusEnumDTO';
import IOrderStore from '../types/OrderStoreEnumDTO';

interface ICortecloudOrder {
  code: string;
  name: string;
  store: IOrderStore;
  delivery: string;
  orderStatus: IOrderStatus;
}

interface ICortecloudContext {
  createOrder();
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const CortecloudContext = createContext<ICortecloudContext>(
  {} as ICortecloudContext,
);

// To use in App.tsx
export const CortecloudProvider: React.FC = ({ children }) => {
  return (
    <CortecloudContext.Provider value={{}}>
      {children}
    </CortecloudContext.Provider>
  );
};

// You can import useAuth and use it instead of useContext
export function useCortecloud(): ICortecloudContext {
  const context = useContext(CortecloudContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
