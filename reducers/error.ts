import { createAction, handleActions } from 'redux-actions';

// Actions
export const throwError = createAction('THROW_ERROR');
export const clearError = createAction('CLEAR_ERROR');

const initialState = new Error()
type State = typeof initialState

// Handle actions
export default handleActions<State, Error>(
    {
        [throwError.toString()]: (_, { payload }) => payload,
        [clearError.toString()]: () => new Error()
    },
    initialState
);
