import { createAction, handleActions } from 'redux-actions';
import { GHUser } from '../models';

export const fetchGHUser = createAction('FETCH_GH_USER');
export const fetchGHUserCompleted = createAction('FETCH_GH_USER_COMPLETED');

const initialState = {
    user: new GHUser({})
}

type State = typeof initialState

export default handleActions<State, { user: GHUser }>(
    {
        [fetchGHUserCompleted.toString()]: (_, p) => {
            try {
                const user = new GHUser(p.payload.user);
                return { user }
            } catch (ERR) {
                console.log(ERR)
                return { user: new GHUser({}) }
            }
        }
    },
    initialState
);
