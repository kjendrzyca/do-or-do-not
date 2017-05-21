import {
  TOGGLE_DONE,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SORT_CHILDREN,
  TOGGLE_HIDDEN_CHILDREN
} from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const sorted = (childIds, nodeId, isDone) => {
  const filteredOutListOfIds = childIds.filter(id => id !== nodeId)

  if (!isDone) {
    return [nodeId].concat(filteredOutListOfIds)
  }

  return filteredOutListOfIds.concat(nodeId)
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        done: false,
        title: action.title,
        childIds: []
      }
    case TOGGLE_DONE:
      return {
        ...state,
        done: action.isDone
      }
    case SORT_CHILDREN: {
      const {nodeId, childId, isDone} = action

      if (nodeId) {
        return {
          ...state,
          childIds: sorted(state.childIds, childId, isDone)
        }
      }

      return {...state}
    }
    case TOGGLE_HIDDEN_CHILDREN: {
      return {
        ...state,
        hiddenChildren: !state.hiddenChildren
      }
    }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

export default (state = {}, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
