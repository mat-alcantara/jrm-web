import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from './Auth';
import { useToast } from './Toast';

import api from '../services/api';

import IOrder from '../types/IOrder';
import ICutlist from '../types/ICutlist';
import ICustomer from '../types/ICustomer';
import IOrderData from '../types/IOrderData';

interface IOrderContext {
  allOrders: IOrder[];
  createOrder(
    selectedCustomer: ICustomer | undefined,
    orderData: IOrderData | undefined,
    cutlist: ICutlist[],
  ): Promise<void>;
  removeOrder(id: string): Promise<void>;
  generatePDF(id: string): Promise<void>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

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

  const generatePDF = useCallback(async (id: string) => {
    const PDFCreatedInBlob = await api.post(
      `/orderpdf/${id}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
        responseType: 'blob',
      },
    );

    const file = new Blob([PDFCreatedInBlob.data], {
      type: 'application/pdf',
    });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);
  }, []);

  const createOrder = useCallback(
    async (
      selectedCustomer: ICustomer,
      orderData: IOrderData,
      cutlist: ICutlist[],
    ) => {
      const orderPostData = {
        customerId: selectedCustomer?.id,
        cutlist,
        orderStore: orderData?.orderStore,
        orderStatus: orderData?.orderStatus,
        paymentStatus: orderData?.paymentStatus,
        ps: orderData?.ps,
        seller: orderData?.seller,
      };

      const orderCreated = await api.post('/orders', orderPostData, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await generatePDF(orderCreated.data.id);

      await loadOrders();

      addToast({ type: 'success', title: 'Pedido criado com sucesso' });

      history.push('/allorders');
    },
    [allOrders],
  );

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
    <OrderContext.Provider
      value={{ allOrders, removeOrder, generatePDF, createOrder }}
    >
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
