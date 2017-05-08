import { takeLatest, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { Moment, prettyFormat } from 'root/utils'

import { INCREMENT_SELECTED_DATE_BY_MONTH, updateSelectedDate } from 'root/actions'

export default function* incrementSelectedDate () {
  yield takeLatest(INCREMENT_SELECTED_DATE_BY_MONTH, function* watch ({ value }) {
    try {
      const selectedDate = yield select(state => state.selectedDate)
      const newDate = selectedDate ? Moment(selectedDate).add(1, 'month') : Moment(value).add(1, 'month')
      yield put(updateSelectedDate(newDate))
      yield put(push(`/${prettyFormat(newDate)}`))
    } catch (error) {
      console.log(error)
    }
  })
}
