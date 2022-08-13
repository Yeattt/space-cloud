import { AuthState } from './';
import { IUser } from '../../interfaces';

type AuthAction =
  | { type: '[AUTH] - Login', payload: IUser }
  | { type: '[AUTH] - Logout' }

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case '[AUTH] - Login':
      return {
        ...state,
        isLogged: true,
        user: action.payload
      }

    case '[AUTH] - Logout':
      return {
        ...state,
        isLogged: false,
        user: undefined
      }
  }
}