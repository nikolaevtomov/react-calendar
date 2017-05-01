import React from 'react'
import { prettyFormat } from 'root/utils'

export default ({ day, dayClass, handleClick }) =>
  <li
    className={dayClass}
    onClick={() => handleClick(prettyFormat(day))}>
    <span>{day.format('Do')} </span>
    <span>{day.format('MMMM')} </span>
    <span>{day.format('dddd')} </span>
  </li>
