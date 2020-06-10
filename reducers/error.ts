import { createAction, handleActions } from 'redux-actions';

// Actions
export const throwError = createAction('THROW_ERROR');
export const clearError = createAction('CLEAR_ERROR');

export const ErrorState = new Error()
type State = typeof ErrorState

// Handle actions
export default handleActions<State, typeof ErrorState>(
    {
        [throwError.toString()]: (_, { payload }) => payload,
        [clearError.toString()]: () => new Error()
    },
    ErrorState
);
