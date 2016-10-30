import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, hashHistory} from 'react-router'

// style
import './less/style.less'

// store
import createStore from '../store'

// router
import AppRouter from '../components/Router'

let store = createStore()
render(
  <Provider store={store}>
    <Router history={hashHistory} routes={AppRouter} />
  </Provider>,
  document.getElementById('container')
)
