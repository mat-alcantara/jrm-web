import React, { createContext, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from './Auth';
import { useToast } from './Toast';

import api from '../services/api';

import IOrder from '../types/IOrder';
import ICutlist from '../types/ICutlist';
import ICustomer from '../types/ICustomer';
import IOrderData from '../types/IOrderData';

interface IOrderContext {
  createOrder(
    selectedCustomer: ICustomer | undefined,
    orderData: IOrderData | undefined,
    cutlist: ICutlist[],
  ): Promise<void>;
  removeOrder(id: string): Promise<void>;
  generatePDF(id: string): Promise<void>;
  loadOrders(): Promise<IOrder[]>;
  updateOrderStatus(id: string, orderStatus: string): Promise<void>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const { getToken } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const loadOrders = useCallback(async () => {
    const token = getToken();

    const allOrdersData = await api.get<IOrder[]>('/orders', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return allOrdersData.data;
  }, []);

  const generatePDF = useCallback(async (id: string) => {
    const token = getToken();

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
      const token = getToken();

      const cutlistWithoutId = cutlist.map((cut) => {
        return {
          material_id: cut.material_id,
          price: cut.price,
          quantidade: cut.quantidade,
          side_a_border: cut.side_a_border,
          side_a_size: cut.side_a_size,
          side_b_border: cut.side_b_border,
          side_b_size: cut.side_b_size,
        };
      });

      const orderPostData = {
        customerId: selectedCustomer?.id,
        cutlist: cutlistWithoutId,
        orderStore: orderData?.orderStore,
        orderStatus: orderData?.orderStatus,
        // paymentStatus: orderData?.paymentStatus,
        ps: orderData?.ps,
        seller: orderData?.seller,
        delivery_type: orderData.delivery_type,
      };

      const orderCreated = await api.post('/orders', orderPostData, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await generatePDF(orderCreated.data.id);

      addToast({ type: 'success', title: 'Pedido criado com sucesso' });

      history.push('/allorders');
    },
    [],
  );

  const removeOrder = useCallback(async (id: string) => {
    const token = getToken();

    await api.delete(`/orders/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    addToast({ type: 'success', title: 'Pedido removido com sucesso' });
  }, []);

  const updateOrderStatus = useCallback(
    async (id: string, orderStatus: string) => {
      try {
        const token = getToken();

        await api.put(
          `/orders/${id}`,
          { orderStatus },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        addToast({
          type: 'success',
          title: 'Status do pedido atualizado com sucesso',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro na atualização do status do pedido',
        });
      }
    },
    [],
  );

  return (
    <OrderContext.Provider
      value={{
        loadOrders,
        removeOrder,
        generatePDF,
        createOrder,
        updateOrderStatus,
      }}
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
