import React from 'react'
import { Moment } from 'root/utils'

export default ({ month }) =>
  <option value={month}> {Moment(month).format('MMMM')}</option>
