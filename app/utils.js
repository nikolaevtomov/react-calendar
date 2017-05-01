import moment from 'moment'
import { extendMoment } from 'moment-range'

export const Moment = extendMoment(moment)
export const prettyFormat = day => moment(day).format('YYYY-MM-DD')

export const typeValueAction = type => value => ({ type, value })
