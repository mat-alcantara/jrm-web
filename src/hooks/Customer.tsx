import React, { createContext, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useAuth } from './Auth';
import { useToast } from './Toast';

import ICustomer from '../types/ICustomer';
import IAddressData from '../types/IAddressData';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface ICustomerContext {
  createCustomer(
    dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>,
  ): Promise<void>;
  removeCustomer(id: string): Promise<void>;
  loadCustomers(): Promise<ICustomer[]>;
  updateCustomerAddress(addressData: IAddressData, id: string): Promise<void>;
}

// Creation of the context
const CustomerContext = createContext<ICustomerContext>({} as ICustomerContext);

export const CustomerProvider: React.FC = ({ children }) => {
  const { getToken } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const loadCustomers = useCallback(async () => {
    const token = getToken();

    const allCustomersFromApi = await api.get<ICustomer[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return allCustomersFromApi.data;
  }, []);

  const createCustomer = useCallback(
    async (dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>) => {
      const token = getToken();

      await api.post<ICustomer>('/customers', dataToCreateCustomer, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      addToast({ type: 'success', title: 'Usuário criado com sucesso' });

      history.push('/newcutlist');
    },
    [],
  );

  const removeCustomer = useCallback(async (id: string) => {
    try {
      const token = getToken();

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

  const updateCustomerAddress = useCallback(
    async (customerData: IAddressData, id: string) => {
      const token = getToken();

      await api.put(`customers/${id}`, customerData, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      addToast({ type: 'success', title: 'Endereço atualizado' });
    },
    [],
  );

  return (
    <CustomerContext.Provider
      value={{
        createCustomer,
        removeCustomer,
        loadCustomers,
        updateCustomerAddress,
      }}
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
