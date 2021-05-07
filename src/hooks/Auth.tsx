/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IAuthState {
  token: string;
  user: object;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: object;
  token: string;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

// To use in App.tsx
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@JRMCompensados:token');
    const user = localStorage.getItem('@JRMCompensados:user');

    console.log(token);

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/session', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@JRMCompensados:token', token);
    localStorage.setItem('@JRMCompensados:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@JRMCompensados:token');
    localStorage.removeItem('@JRMCompensados:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, token: data.token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// You can import useAuth and use it instead of useContext
export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
