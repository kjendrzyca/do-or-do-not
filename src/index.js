import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import pushToServerSaga from './pushToServerSaga'
import api from './api'
import generateTree from './generateTree'
import Node from './containers/Node'

import './index.css'

async function seedApi () {
  const tree = generateTree()
  const data = await api.getAll()
  if (data.length) {
    return data
  }

  for (let node of Object.values(tree)) {
    await api.create(node)
  }

  return await api.getAll()
}

async function run () {
  const data = await seedApi()
  const reducedData = data.reduce(function(map, obj) {
      map[obj.id] = obj
      return map
  }, {})

  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    reducedData,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(pushToServerSaga)

  render(
    <Provider store={store}>
      <Node id={0} />
    </Provider>,
    document.getElementById('root')
  )
}

run()
