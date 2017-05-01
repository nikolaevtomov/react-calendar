
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import today from 'root/reducers/today'
import selectedDate from 'root/reducers/selected-date'

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  today,
  selectedDate
})

export default rootReducer
