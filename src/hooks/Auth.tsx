/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import { auth } from '../services/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

interface IAuthState {
  token: string;
  user: User;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  getToken(): string | null;
  checkAuth(credentials: ISignInCredentials): Promise<boolean>;
}

// {} as IAuthContext allows to init object empty
// To use in useContext
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

// To use in App.tsx
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@JRMCompensados:token');
    const user = localStorage.getItem('@JRMCompensados:user');

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

    await auth.signInWithEmailAndPassword(email, password);

    localStorage.setItem('@JRMCompensados:token', token);
    localStorage.setItem('@JRMCompensados:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@JRMCompensados:token');
    localStorage.removeItem('@JRMCompensados:user');

    auth.signOut();

    setData({} as IAuthState);
  }, []);

  const checkAuth = useCallback(async ({ email, password }) => {
    try {
      await api.post('/session', {
        email,
        password,
      });

      return true;
    } catch {
      return false;
    }
  }, []);

  const getToken = useCallback(() => {
    const token = localStorage.getItem('@JRMCompensados:token');

    return token;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, getToken, checkAuth }}
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
