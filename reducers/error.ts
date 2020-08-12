import { createAction, handleActions } from 'redux-actions';

// Actions
export const throwError = createAction('THROW_ERROR');
export const clearError = createAction('CLEAR_ERROR');

export const ErrorState = null;
type State = Error | null;

// Handle actions
export default handleActions<State, any>(
  {
    [throwError.toString()]: (_, { payload }) => payload,
    [clearError.toString()]: () => null,
  },
  ErrorState,
);
