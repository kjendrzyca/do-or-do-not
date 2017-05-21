import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

import './index.css'

import api from './api'

async function testApi () {
  // console.log(await api.getAll())
  console.log(await api.create({
    id: 'asdas79837198379',
    done: false,
    title: 'ROOT',
    childIds: [],
    hiddenChildren: false
  }))
  console.log(await api.update({
    id: 'asdas79837198379',
    done: true,
    title: 'ROOT1',
    childIds: [1,2,3],
    hiddenChildren: true
  }))
  console.log(await api.delete('asdas79837198379'))
}

testApi()

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
