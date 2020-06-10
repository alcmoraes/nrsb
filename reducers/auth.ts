import { createAction, handleActions } from 'redux-actions';
import { User } from '../models';

export const authUser = createAction('AUTH_USER');
export const logoutUser = createAction('LOGOUT_USER');
export const authUserCompleted = createAction('AUTH_USER_COMPLETED');

export const AuthState = {
    user: new User({})
}

type State = typeof AuthState

export default handleActions<State, typeof AuthState>(
    {
        [authUserCompleted.toString()]: (_, { payload: { user } }) => ({ user: new User(user) }),
        [logoutUser.toString()]: () => {
            localStorage.removeItem("stored_credentials");
            return { user: new User({}) }
        }
    },
    AuthState
);
