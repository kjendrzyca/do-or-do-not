import cuid from 'cuid'

export const TOGGLE_DONE = 'TOGGLE_DONE'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'

export const markAsDone = (nodeId) => ({
  type: TOGGLE_DONE,
  nodeId
})

const getNextId = () => cuid()

export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: getNextId()
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