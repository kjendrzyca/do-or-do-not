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
      console.log('ADD_CHILD!', yield call(api.update, state[action.nodeId]))
    break
    case REMOVE_CHILD:
      console.log('ADD_CHILD!', yield call(api.update, state[action.nodeId]))
    break
    case CREATE_NODE:
      console.log('CREATE_NODE API CALLING!', yield call(api.create, state[action.nodeId]))
    break
    case DELETE_NODE:
      console.log('ADD_CHILD!', yield call(api.delete, action.nodeId))
    break
    case SORT_CHILDREN:
      console.log('SORT_CHILDREN API CALLING!', yield call(api.update, state[action.nodeId]))
    break
    case TOGGLE_HIDDEN_CHILDREN:
      console.log('TOGGLE_HIDDEN_CHILDREN API CALLING!', yield call(api.update, state[action.nodeId]))
    break
    default:
      console.log('server not updated')
    }

    console.log('action', action)
    console.log('state after', state[action.nodeId])
  })
}
