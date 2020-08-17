import { createAction, handleActions } from 'redux-actions';
import { User } from '../models';

export const authUser = createAction('AUTH_USER');
export const logoutUser = createAction('LOGOUT_USER');
export const authUserCompleted = createAction('AUTH_USER_COMPLETED');

export type AuthUserSignature = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User;
};

export default handleActions<AuthState>(
  {
    [authUserCompleted.toString()]: (state, { payload: { user } }) => ({ ...state, ...{ user: new User(user) } }),
    [logoutUser.toString()]: state => {
      localStorage.removeItem('stored_credentials');
      return { ...state, ...{ user: new User() } };
    },
  },
  {
    user: new User(),
    // ... Other auth related states
  },
);
