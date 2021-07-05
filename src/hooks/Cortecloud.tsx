/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import { database } from '../services/firebase';

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
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const CortecloudContext = createContext<ICortecloudContext>(
  {} as ICortecloudContext,
);

// To use in App.tsx
export const CortecloudProvider: React.FC = ({ children }) => {
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
    },
    [],
  );

  return (
    <CortecloudContext.Provider value={{ createCortecloud, orders }}>
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
