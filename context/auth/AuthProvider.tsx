import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces';
import { spaceApi } from '../../api';

interface Props {
  children: React.ReactNode;
}

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) {
      return;
    }

    try {
      const { data } = await spaceApi.get('/auth/validate');

      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[AUTH] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
      return;
    }
  }

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await spaceApi.post('/auth/signup', { email, password });

      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[AUTH] - Login', payload: user });

      return true;
    } catch (error) {
      return false;
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await spaceApi.post('/auth/signin', { email, password });

      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[AUTH] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  }

  const logout = () => {
    Cookies.remove('token');
    router.reload();

    dispatch({ type: '[AUTH] - Logout' });
  }

  return (
    <>
      <AuthContext.Provider value={{
        ...state,

        // Methods
        register,
        login,
        logout
      }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}