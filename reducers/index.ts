import { combineReducers } from 'redux-immutable';

import auth from './auth';
import error from './error';

export * from './auth';
export * from './error';

export default combineReducers({ auth, error });
