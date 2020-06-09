import { combineReducers } from 'redux-immutable';

import ghub from './ghub';
import error from './error';

export * from './ghub';
export * from './error';

export default combineReducers({ ghub, error });
