import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
  isLogged: boolean;
  user?: IUser;

  // Methods
  register: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);