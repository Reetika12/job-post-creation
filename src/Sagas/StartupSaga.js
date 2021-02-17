import { put } from 'redux-saga/effects'

export function* startupSaga (startupCreators) {
   yield put(startupCreators.inited())
}