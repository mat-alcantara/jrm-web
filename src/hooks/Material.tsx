import React, { createContext, useContext, useCallback } from 'react';

import { useAuth } from './Auth';
import { useToast } from './Toast';

import api from '../services/api';

import IMaterial from '../types/IMaterial';

interface IMaterialContext {
  removeMaterial(id: string): Promise<void>;
  createMaterial(data: Optional<IMaterial, 'id'>): Promise<IMaterial>;
  loadMaterials(): Promise<IMaterial[]>;
  updatePrice(id: string, newPrice: number): Promise<void>;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const MaterialContext = createContext<IMaterialContext>({} as IMaterialContext);

export const MaterialProvider: React.FC = ({ children }) => {
  const { getToken } = useAuth();
  const { addToast } = useToast();

  const loadMaterials = useCallback(async () => {
    const token = getToken();

    const materialsDataFromRequest = await api.get('/materials', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return materialsDataFromRequest.data;
  }, []);

  const createMaterial = useCallback(
    async (submitData: Optional<IMaterial, 'id'>) => {
      const token = getToken();

      const materialCreated = await api.post<IMaterial>(
        '/materials',
        submitData,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      addToast({
        type: 'success',
        title: 'Material cadastrado com sucesso',
      });

      return materialCreated.data;
    },
    [],
  );

  const removeMaterial = useCallback(async (id: string) => {
    const token = getToken();

    await api.delete(`/materials/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    addToast({ type: 'success', title: 'Material removido com sucesso' });
  }, []);

  const updatePrice = useCallback(async (id: string, newPrice: number) => {
    try {
      const token = getToken();

      await api.put(
        `/materials/${id}`,
        { price: newPrice },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      addToast({
        type: 'success',
        title: 'Preço do pedido atualizado com sucesso!',
      });

      window.location.reload();
    } catch {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro na atualização do status do pedido',
      });
    }
  }, []);

  return (
    <MaterialContext.Provider
      value={{ removeMaterial, createMaterial, loadMaterials, updatePrice }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export function useMaterial(): IMaterialContext {
  const context = useContext(MaterialContext);

  if (!context) {
    throw new Error('useMaterial must be used within an AuthProvider');
  }

  return context;
}
