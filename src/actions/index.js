import cuid from 'cuid'

export const TOGGLE_DONE = 'TOGGLE_DONE'
export const SORT_CHILDREN = 'SORT_CHILDREN'
export const TOGGLE_HIDDEN_CHILDREN = 'TOGGLE_HIDDEN_CHILDREN'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'

const getNextId = () => cuid()

export const toggleDone = (nodeId, isDone) => ({
  type: TOGGLE_DONE,
  nodeId,
  isDone
})

export const sortChildren = (nodeId, childId, isDone) => ({
  type: SORT_CHILDREN,
  nodeId,
  childId,
  isDone
})

export const toggleHiddenChildren = (nodeId) => ({
  type: TOGGLE_HIDDEN_CHILDREN,
  nodeId
})

export const createNode = (title) => ({
  type: CREATE_NODE,
  nodeId: getNextId(),
  title
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})
