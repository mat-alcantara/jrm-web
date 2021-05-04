import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import api from '../services/api';
import { useAuth } from './Auth';

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

  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    async function loadCustomers() {
      const allCustomersFromApi = await api.get<ICustomer[]>('/customers', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setAllCustomers([...allCustomersFromApi.data]);
    }

    loadCustomers();
  }, []);

  const createCustomer = useCallback(
    async (dataToCreateCustomer: Optional<ICustomer, 'id' | 'email'>) => {
      const customerCreated = await api.post(
        '/customers',
        dataToCreateCustomer,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      setAllCustomers((prevValue) => [...prevValue, ...customerCreated.data]);
    },
    [allCustomers],
  );

  const removeCustomer = useCallback(
    async (id: string) => {
      await api.delete('/customers', {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          id,
        },
      });

      const customersWithoutDeleted = allCustomers.filter(
        (customer) => customer.id !== id,
      );

      setAllCustomers([...customersWithoutDeleted]);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
