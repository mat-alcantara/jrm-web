import React, { createContext, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useAuth } from './Auth';
import { useToast } from './Toast';

import ICustomer from '../types/ICustomer';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface ICustomerContext {
  createCustomer(
    dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>,
  ): Promise<void>;
  removeCustomer(id: string): Promise<void>;
  loadCustomers(): Promise<ICustomer[]>;
}

// Creation of the context
const CustomerContext = createContext<ICustomerContext>({} as ICustomerContext);

export const CustomerProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const loadCustomers = useCallback(async () => {
    const allCustomersFromApi = await api.get<ICustomer[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return allCustomersFromApi.data;
  }, []);

  const createCustomer = useCallback(
    async (dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>) => {
      // eslint-disable-next-line no-console
      console.log(token);

      await api.post<ICustomer>('/customers', dataToCreateCustomer, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      addToast({ type: 'success', title: 'Usuário criado com sucesso' });

      history.push('/customerslist');
    },
    [],
  );

  const removeCustomer = useCallback(async (id: string) => {
    try {
      await api.delete('/customers', {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          id,
        },
      });

      addToast({ type: 'success', title: 'Cliente removido com sucesso' });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro na remoção do cliente',
        description: 'Cliente pode estar atribuído a algum pedido',
      });
    }
  }, []);

  return (
    <CustomerContext.Provider
      value={{ createCustomer, removeCustomer, loadCustomers }}
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
