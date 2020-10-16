import React from 'react'
import {render} from 'react-dom'
import {
  createStore,
  // applyMiddleware
} from 'redux'
import {Provider} from 'react-redux'
// import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
// import pushToServerSaga from './pushToServerSaga'
import api from './api'
import generateTree from './generateTree'
import ConnectedNode from './containers/Node'

import './index.css'

// TODO: server sync
// eslint-disable-next-line no-unused-vars
async function seedApi() {
  const tree = generateTree()
  const data = await api.getAll()
  if (data.length) {
    return data
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const node of Object.values(tree)) {
    // eslint-disable-next-line no-await-in-loop
    await api.create(node)
  }

  return api.getAll()
}

async function run() {
  // const data = await seedApi()
  const data = Object.values(generateTree())

  console.log({data})

  const reducedData = data.reduce((map, obj) => {
    // eslint-disable-next-line no-param-reassign
    map[obj.id] = obj
    return map
  }, {})

  console.log({reducedData})

  // const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    reducedData,
    // applyMiddleware(sagaMiddleware)
  )

  // sagaMiddleware.run(pushToServerSaga)

  render(
    <Provider store={store}>
      <ConnectedNode id={0} />
    </Provider>,
    document.getElementById('root'),
  )
}

run()
