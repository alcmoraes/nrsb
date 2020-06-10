import { all, fork } from 'redux-saga/effects';

import auth from './auth';

export default function* mainSaga() {
    yield all([fork(auth)]);
}
