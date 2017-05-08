import { takeLatest, fork, put } from 'redux-saga/effects'

import updateSelectedDate from 'root/sagas/update-selected-date'
import incrementSelectedDate from 'root/sagas/increment-month'
import decrementSelectedDate from 'root/sagas/decrement-month'

import {
  APP_LOADING_STARTED,
  appLoadingSucceed,
  appLoadingFailed,
  setInitialDate
} from 'root/actions'

export function* initializeAppState () {
  try {
    yield put(setInitialDate())
    yield put(appLoadingSucceed())
  } catch (error) {
    yield put(appLoadingFailed())
  }
}

export function* watchInitializeAppState () {
  yield takeLatest(APP_LOADING_STARTED, initializeAppState)
}

export default function* startForeman () {
  yield fork(watchInitializeAppState)
  yield fork(updateSelectedDate)
  yield fork(incrementSelectedDate)
  yield fork(decrementSelectedDate)
}
