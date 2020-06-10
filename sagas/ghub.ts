import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchGHUser, fetchGHUserCompleted, throwError } from '../reducers';
import { get } from '../lib/HTTP';

function* fetchGHUserSaga({ payload }: { payload: String }) {
    try {
        const user = yield call(get, payload);
        yield put(fetchGHUserCompleted({user}));
    } catch (error) {
        yield put(throwError(error));
    }
}

export default function* ghubSaga() {
    yield all([takeLatest(fetchGHUser, fetchGHUserSaga)]);
}
