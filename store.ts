import Immutable from 'immutable';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import mainSaga from './sagas';
import mainReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
export default createStore(
    mainReducer,
    Immutable.fromJS({}),
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mainSaga);
