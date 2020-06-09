import { createAction, handleActions } from 'redux-actions';

export const throwError = createAction('THROW_ERROR');
export const clearError = createAction('CLEAR_ERROR');

const initialState: Error = new Error()

type State = typeof initialState

export default handleActions<State, Error>(
    {
        [throwError.toString()]: (_, p) => p.payload,
        [clearError.toString()]: () => new Error()
    },
    initialState
);
