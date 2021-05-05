import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { useAuth } from './Auth';
import { useToast } from './Toast';

import api from '../services/api';

import IMaterial from '../types/IMaterial';

interface IMaterialContext {
  allMaterials: IMaterial[];
  removeMaterial(id: string): Promise<void>;
  createMaterial(data: Optional<IMaterial, 'id'>): Promise<IMaterial>;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const MaterialContext = createContext<IMaterialContext>({} as IMaterialContext);

export const MaterialProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const { addToast } = useToast();

  const [allMaterials, setAllMaterials] = useState<IMaterial[]>([]);

  const loadMaterials = useCallback(async () => {
    const materialsDataFromRequest = await api.get('/materials', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    setAllMaterials([...materialsDataFromRequest.data]);
  }, [allMaterials]);

  useEffect(() => {
    loadMaterials();
  }, []);

  const createMaterial = useCallback(
    async (submitData: Optional<IMaterial, 'id'>) => {
      const materialCreated = await api.post<IMaterial>(
        '/materials',
        submitData,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      await loadMaterials();

      addToast({
        type: 'success',
        title: 'Material cadastrado com sucesso',
      });

      return materialCreated.data;
    },
    [allMaterials],
  );

  const removeMaterial = useCallback(
    async (id: string) => {
      await api.delete(`/materials/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await loadMaterials();

      addToast({ type: 'success', title: 'Material removido com sucesso' });
    },
    [allMaterials],
  );

  return (
    <MaterialContext.Provider
      value={{ allMaterials, removeMaterial, createMaterial }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export function useMaterial(): IMaterialContext {
  const context = useContext(MaterialContext);

  if (!context) {
    throw new Error('useCustomer must be used within an AuthProvider');
  }

  return context;
}
