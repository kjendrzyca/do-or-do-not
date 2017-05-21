import deepFreeze from 'deep-freeze'
import reducer from './index'
import {
  toggleDone,
  createNode,
  deleteNode,
  addChild,
  removeChild,
  sortChildren,
  toggleHiddenChildren
} from '../actions'

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle TOGGLE_DONE action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: []
      }
    }
    const action = toggleDone('node_0', true)
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: true,
        childIds: []
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle SORT_CHILDREN action when children done flag was set to `true`', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [1, 2, 3]
      }
    }
    const action = sortChildren('node_0', 1, true)
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [2, 3, 1]
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle SORT_CHILDREN action when children done flag was set to `false`', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [1, 2, 3]
      }
    }
    const action = sortChildren('node_0', 3, false)
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [3, 1, 2]
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle CREATE_NODE action', () => {
    const stateBefore = {}
    const action = createNode('some title')
    const stateAfter = {
      [action.nodeId]: {
        id: action.nodeId,
        done: false,
        title: 'some title',
        childIds: [],
        hiddenChildren: false
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle DELETE_NODE action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      },
      'node_2': {
        id: 'node_2',
        done: false,
        childIds: [ 'node_3', 'node_4' ]
      },
      'node_3': {
        id: 'node_3',
        done: false,
        childIds: []
      },
      'node_4': {
        id: 'node_4',
        done: false,
        childIds: []
      }
    }
    const action = deleteNode('node_2')
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle ADD_CHILD action and add new child at the beggining', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: ['node_1']
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      },
      'node_2': {
        id: 'node_2',
        done: false,
        childIds: []
      }
    }
    const action = addChild('node_0', 'node_2')
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: ['node_2', 'node_1']
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      },
      'node_2': {
        id: 'node_2',
        done: false,
        childIds: []
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle REMOVE_CHILD action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      }
    }
    const action = removeChild('node_0', 'node_1')
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: []
      },
      'node_1': {
        id: 'node_1',
        done: false,
        childIds: []
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle TOGGLE_HIDDEN_CHILDREN action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [],
        hiddenChildren: false
      }
    }
    const action = toggleHiddenChildren('node_0')
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        done: false,
        childIds: [],
        hiddenChildren: true
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})
