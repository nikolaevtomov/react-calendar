import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Stores } from 'root/stores'
import App from 'root/containers/app'
import Calendar from 'root/components/calendar'

const history = syncHistoryWithStore(browserHistory, Stores)

export default () => (
  <Router history={history}>

    <Route path={'/'} component={App}>

      <IndexRoute component={Calendar} />
      <Route path={'/:date'} component={Calendar} />

    </Route>

    {/* <Redirect from={'*'} to={'/'} /> */}

  </Router>
)
