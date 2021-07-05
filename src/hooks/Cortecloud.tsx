/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { useToast } from './Toast';

interface ICortecloudOrder {
  code: string;
  name: string;
  store: 'Frade' | 'Japuíba';
  delivery: string;
  status:
    | 'Em Produção'
    | 'Liberado para Transporte'
    | 'Transportado'
    | 'Entregue';
}

interface ICortecloudContext {
  createCortecloud(orderData: ICortecloudOrder): Promise<void>;
  orders: ICortecloudOrder[];
  updateStatus(id: string, updatedStatus: string): Promise<void>;
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const CortecloudContext = createContext<ICortecloudContext>(
  {} as ICortecloudContext,
);

// To use in App.tsx
export const CortecloudProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const history = useHistory();
  const [orders, setOrders] = useState<ICortecloudOrder[]>([]);

  useEffect(() => {
    const cortecloudRef = database.ref(`cortecloud`);

    cortecloudRef.on('value', (cortecloud) => {
      const cortecloudData: ICortecloudOrder[] = cortecloud.val();

      const parsedOrders = Object.entries(cortecloudData).map(
        ([key, value]) => {
          return {
            id: key,
            code: value.code,
            name: value.name,
            status: value.status,
            store: value.store,
            delivery: value.delivery,
          };
        },
      );

      setOrders(parsedOrders);
    });

    return () => {
      cortecloudRef.off('value');
    };
  }, []);

  const createCortecloud = useCallback(
    async ({ code, delivery, name, status, store }: ICortecloudOrder) => {
      const cortecloudRef = database.ref(`cortecloud/${code}`);

      await cortecloudRef.set({ code, delivery, name, status, store });

      addToast({ type: 'success', title: 'Cortecloud criado com sucesso' });

      history.push('/dashboard');
    },
    [],
  );

  const updateStatus = useCallback(
    async (code: string, updatedStatus: string) => {
      const cortecloudRef = database.ref(`cortecloud/${code}`);

      await cortecloudRef.set({ status: updatedStatus });

      addToast({
        type: 'success',
        title: 'Status do pedido atualizado com sucesso',
      });

      window.location.reload();
    },
    [orders],
  );

  return (
    <CortecloudContext.Provider
      value={{ createCortecloud, orders, updateStatus }}
    >
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
