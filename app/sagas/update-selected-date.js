import { takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { prettyFormat } from 'root/utils'

import { UPDATE_SELECTED_DATE, setSelectedDate } from 'root/actions'

export default function* updateSelectedDate () {
  yield takeLatest(UPDATE_SELECTED_DATE, function* watch ({ value }) {
    try {
      yield put(setSelectedDate(prettyFormat(value)))
      yield put(push(`/${prettyFormat(value)}`))
    } catch (error) {
      console.log(error)
    }
  })
}
