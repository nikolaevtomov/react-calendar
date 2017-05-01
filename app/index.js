
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import Routes from 'root/routes'
import { Stores } from 'root/stores'
import { appLoadingStarted } from 'root/actions'

import 'root/styles/index.scss'

Stores.dispatch(appLoadingStarted())

module.hot && module.hot.accept()

render(
  <AppContainer>
    <Provider store={Stores}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
)
