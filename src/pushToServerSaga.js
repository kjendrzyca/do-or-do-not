import { call, select, takeEvery } from 'redux-saga/effects'

import {
  TOGGLE_DONE,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SORT_CHILDREN,
  TOGGLE_HIDDEN_CHILDREN
} from './actions'

import api from './api'

export default function * pushToServerSaga () {
  yield takeEvery('*', function * pushToServer(action) {
    const state = yield select()

    switch(action.type) {
    case TOGGLE_DONE:
      yield call(api.update, state[action.nodeId])
    break
    case ADD_CHILD:
      yield call(api.update, state[action.nodeId])
    break
    case REMOVE_CHILD:
      yield call(api.update, state[action.nodeId])
    break
    case CREATE_NODE:
      yield call(api.create, state[action.nodeId])
    break
    case DELETE_NODE:
      yield call(api.delete, action.nodeId)
    break
    case SORT_CHILDREN:
      yield call(api.update, state[action.nodeId])
    break
    case TOGGLE_HIDDEN_CHILDREN:
      yield call(api.update, state[action.nodeId])
    break
    default:
      console.log('server not updated')
    }
  })
}
