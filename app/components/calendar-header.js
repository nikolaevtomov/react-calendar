import React from 'react'
import PropTypes from 'prop-types'
import 'root/components/_calendar-header.scss'

const CalendarHeader = ({ weekNames }) => {
  return (
    <ul className={'calendar-header'}>
      {weekNames.map(name => <li key={name} className={'calendar-header__item'}>{name}</li>)}
    </ul>
  )
}

CalendarHeader.propTypes = {
  weekNames: PropTypes.array.isRequired
}

export default CalendarHeader
