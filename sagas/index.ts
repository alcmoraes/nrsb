import { all, fork } from 'redux-saga/effects';

import ghub from './ghub';

export default function* mainSaga() {
    yield all([fork(ghub)]);
}
