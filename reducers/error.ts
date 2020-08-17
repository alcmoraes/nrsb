import { createAction, handleActions } from 'redux-actions';

// Actions
export const throwError = createAction('THROW_ERROR');
export const clearError = createAction('CLEAR_ERROR');

export type ErrorState = Error | null;

// Handle actions
export default handleActions<ErrorState>(
  {
    [throwError.toString()]: (_, { payload }) => payload,
    [clearError.toString()]: () => null,
  },
  null,
);
