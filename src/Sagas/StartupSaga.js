import { put } from 'redux-saga/effects'

export function* startupSaga (startupCreators, api, data) {
   yield put(startupCreators.inited())
}