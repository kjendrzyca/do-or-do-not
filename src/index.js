import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

registerServiceWorker()

const tree = generateTree()
const store = createStore(
  reducer,
  tree,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
