import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import { useAuth } from './Auth';

import api from '../services/api';

import IOrder from '../types/IOrder';

interface IOrderContext {
  allOrders: IOrder[];
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const { token } = useAuth();

  const [allOrders, setAllOrders] = useState<IOrder[]>([]);

  const loadOrders = useCallback(async () => {
    const allOrdersData = await api.get<IOrder[]>('/orders', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllOrders([...allOrdersData.data]);
  }, [allOrders]);

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ allOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder(): IOrderContext {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used within an AuthProvider');
  }

  return context;
}
