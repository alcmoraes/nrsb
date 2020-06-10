import { all, put, takeLatest } from 'redux-saga/effects';
import { authUser, authUserCompleted, throwError } from '../reducers';

function* authUserSaga(p: { payload: { email: string, password: string } }) {
    try {

        // TODO: Replace with a proper authentiaction method
        if(p.payload.email == 'admin' && p.payload.password == 'admin') {
            let user = { name: 'Alejandro Morales', id: 12345 }
            localStorage.setItem("stored_credentials", JSON.stringify( p.payload ))
            yield put(authUserCompleted({user}));
        } else {
            localStorage.removeItem("stored_credentials");
            throw new Error('Invalid Credentials');
        }

    } catch (error) {
        yield put(throwError(error));
    }
}

export default function* ghubSaga() {
    yield all([takeLatest(authUser, authUserSaga)]);
}
