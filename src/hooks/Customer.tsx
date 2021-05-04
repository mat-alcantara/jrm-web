import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useAuth } from './Auth';
import { useToast } from './Toast';

import ICustomer from '../types/ICustomer';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface ICustomerContext {
  allCustomers: ICustomer[];
  createCustomer(
    dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>,
  ): Promise<void>;
  removeCustomer(id: string): Promise<void>;
}

// Creation of the context
const CustomerContext = createContext<ICustomerContext>({} as ICustomerContext);

export const CustomerProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const { addToast } = useToast();

  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  const history = useHistory();

  const loadCustomers = useCallback(async () => {
    const allCustomersFromApi = await api.get<ICustomer[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllCustomers([...allCustomersFromApi.data]);
  }, [allCustomers]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const createCustomer = useCallback(
    async (dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>) => {
      await api.post<ICustomer>('/customers', dataToCreateCustomer, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await loadCustomers();

      addToast({ type: 'success', title: 'Usuário criado com sucesso' });

      history.push('/customerslist');
    },
    [allCustomers],
  );

  const removeCustomer = useCallback(
    async (id: string) => {
      try {
        await api.delete('/customers', {
          headers: {
            Authorization: `bearer ${token}`,
          },
          data: {
            id,
          },
        });

        await loadCustomers();

        addToast({ type: 'success', title: 'Cliente removido com sucesso' });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na remoção do cliente',
          description: 'Cliente pode estar atribuído a algum pedido',
        });
      }
    },
    [allCustomers],
  );

  return (
    <CustomerContext.Provider
      value={{ allCustomers, createCustomer, removeCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// Hook
export function useCustomer(): ICustomerContext {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error('useCustomer must be used within an AuthProvider');
  }

  return context;
}
