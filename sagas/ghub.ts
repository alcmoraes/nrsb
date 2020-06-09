import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchGHUser, fetchGHUserCompleted, throwError } from '../reducers';
import { getGHUserFromAPI } from '../api';

function* fetchGHUserSaga(data: { payload: String }) {
    try {
        const user = yield call(getGHUserFromAPI, data.payload);
        yield put(fetchGHUserCompleted({user}));
    } catch (error) {
        yield put(throwError(error));
    }
}

export default function* ghubSaga() {
    yield all([takeLatest(fetchGHUser, fetchGHUserSaga)]);
}
