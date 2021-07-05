/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';

import IOrderStatus from '../types/OrderStatusEnumDTO';
import IOrderStore from '../types/OrderStoreEnumDTO';

import { database } from '../services/firebase';

interface ICortecloudOrder {
  code: string;
  name: string;
  store: IOrderStore;
  delivery: string;
  orderStatus: IOrderStatus;
}

interface ICortecloudContext {
  createCortecloud(orderData: ICortecloudOrder): Promise<void>;
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const CortecloudContext = createContext<ICortecloudContext>(
  {} as ICortecloudContext,
);

// To use in App.tsx
export const CortecloudProvider: React.FC = ({ children }) => {
  const createCortecloud = useCallback(
    async ({ code, delivery, name, orderStatus, store }: ICortecloudOrder) => {
      const cortecloudRef = database.ref(`cortecloud/${code}`);

      await cortecloudRef.set({ code, delivery, name, orderStatus, store });
    },
    [],
  );

  return (
    <CortecloudContext.Provider value={{ createCortecloud }}>
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
