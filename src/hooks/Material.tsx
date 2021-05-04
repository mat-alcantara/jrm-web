import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { useAuth } from './Auth';

import api from '../services/api';

import IMaterial from '../types/IMaterial';

interface IMaterialContext {
  allMaterials: IMaterial[];
}

const MaterialContext = createContext<IMaterialContext>({} as IMaterialContext);

export const MaterialProvider: React.FC = ({ children }) => {
  const { token } = useAuth();

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

  return (
    <MaterialContext.Provider value={{ allMaterials }}>
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
