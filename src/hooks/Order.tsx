import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import { useAuth } from './Auth';
import { useToast } from './Toast';

import api from '../services/api';

import IOrder from '../types/IOrder';

interface IOrderContext {
  allOrders: IOrder[];
  removeOrder(id: string): Promise<void>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const { addToast } = useToast();

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

  const removeOrder = useCallback(
    async (id: string) => {
      await api.delete(`/orders/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await loadOrders();

      addToast({ type: 'success', title: 'Pedido removido com sucesso' });
    },
    [allOrders],
  );

  return (
    <OrderContext.Provider value={{ allOrders, removeOrder }}>
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
