import { SET_INITIAL_DATE } from 'root/actions'
import { prettyFormat, Moment } from 'root/utils'

const initialState = ''

export default function (state = initialState, { type, value }) {
  switch (type) {
    case SET_INITIAL_DATE:
      return prettyFormat(Moment())

    default:
      return state
  }
}
