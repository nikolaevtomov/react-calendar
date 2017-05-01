import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Moment, prettyFormat } from 'root/utils'
import CalendarHeader from 'root/components/calendar-header'
import Day from 'root/components/day'
import Month from 'root/components/month'
import 'root/components/_calendar.scss'

import {
  incrementSelectedDateByMonth,
  decrementSelectedDateByMonth,
  updateSelectedDate
} from 'root/actions'

const Calendar = ({
  today,
  params: { date },
  selectDate,
  selectedDate,
  nextMonth,
  previousMonth
}) => {
  const start = Moment(date || today).startOf('month').startOf('week')
  const end = Moment(date || today).endOf('month').endOf('week')
  const range = Moment.range(start, end)
  let days = Array.from(range.by('day', { step: 1 }))

  const classes = day => classNames({
    calendar__day: true,
    calendar__today: prettyFormat(day) === prettyFormat(today),
    'calendar__this-month': Moment(day).format('MM') === Moment(date).format('MM')
  })
  const handleOnClick = day => console.log(day)
  const renderDays = days.map(day =>
    <Day handleClick={handleOnClick} key={day} day={day} dayClass={classes(day)} />)

  const year = prettyFormat(date || today)
  const startYear = Moment(year).startOf('year')
  const endYear = Moment(year).endOf('year')
  const rangeMonths = Moment.range(startYear, endYear)
  let months = Array.from(rangeMonths.by('month', { step: 1 }))

  const handleOnChange = month => selectDate(month)
  const renderMonths = (
    <select className={'select'} value={year} onChange={e => handleOnChange(e.target.value)}>
      {months.map(month => <Month handleChange={handleOnChange} key={month} month={month} />)}
    </select>
  )

  const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div>
      <h2>React Calendar</h2>
      <div className={'button-group'}>
        {renderMonths}
        <button className={'button'} onClick={() => previousMonth(date)}>{'Previous Month'}</button>
        <button className={'button'} onClick={() => nextMonth(date)}>{'Next Month'}</button>
      </div>
      {<CalendarHeader {...{weekNames}} />}
      <ul className={'calendar'}>
        {renderDays}
      </ul>
    </div>
  )
}

export default connect(
  (state) => ({
    today: state.today,
    selectedDate: state.selectedDate
  }),
  {
    selectDate: updateSelectedDate,
    nextMonth: incrementSelectedDateByMonth,
    previousMonth: decrementSelectedDateByMonth
  }
)(Calendar)
