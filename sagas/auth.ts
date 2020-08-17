import { all, put, takeLatest, PutEffect, AllEffect, ForkEffect } from 'redux-saga/effects';
import { authUser, authUserCompleted, throwError, AuthUserSignature } from '../reducers';
import { Action } from 'redux-actions';

function* authUserSaga(p: { payload: AuthUserSignature }): Generator<PutEffect<Action<any>>, void, unknown> {
  try {
    // TODO: Replace with a proper authentiaction method
    if (p.payload.email == 'admin' && p.payload.password == 'admin') {
      const user = { name: 'Alejandro Morales', id: 12345 };
      localStorage.setItem('stored_credentials', JSON.stringify(p.payload));
      yield put(authUserCompleted({ user }));
    } else {
      localStorage.removeItem('stored_credentials');
      throw new Error('Invalid Credentials');
    }
  } catch (error) {
    yield put(throwError(error));
  }
}

export default function* authSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(authUser, authUserSaga)]);
}
