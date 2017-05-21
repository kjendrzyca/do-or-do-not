import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import pushToServerSaga from './pushToServerSaga'
import generateTree from './generateTree'
import Node from './containers/Node'

import './index.css'

import api from './api'

async function testApi () {
  await api.create({
    id: 'asdas79837198379',
    done: false,
    title: 'ROOT',
    childIds: [],
    hiddenChildren: false
  })
  console.log(await api.update({
    id: 'asdas79837198379',
    done: true,
    title: 'ROOT1',
    childIds: [1,2,3],
    hiddenChildren: true
  }))
  // console.log(await api.delete('asdas79837198379'))
  console.log(await api.getAll())
}

const tree = generateTree()
async function seedApi (tree) {
  // await testApi()
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
  const data = await seedApi(tree)
  const reducedData = data.reduce(function(map, obj) {
      map[obj.id] = obj
      return map
  }, {})
  console.log('ALL DATA', reducedData)

  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    reducedData,
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
