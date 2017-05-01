import { SET_SELECTED_DATE } from 'root/actions'

const initialState = ''

export default function (state = initialState, { type, value }) {
  switch (type) {
    case SET_SELECTED_DATE:
      return value

    default:
      return state
  }
}
