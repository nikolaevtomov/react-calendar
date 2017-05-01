import React from 'react'
import { prettyFormat } from 'root/utils'

export default ({ month }) =>
  <option
    value={prettyFormat(month)}>
    {month.format('MMMM')}
  </option>
