import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Node extends Component {
  state = {
    newChildTitle: ''
  }

  handleDoneClick = () => {
    const { toggleDone, sortChildren, id, parentId, done } = this.props
    toggleDone(id, !done)
    sortChildren(parentId, id, !done)
  }

  handleAddChildClick = event => {
    if (event.key.toLowerCase() !== 'enter') {
      return
    }

    const {addChild, createNode, id} = this.props
    const {newChildTitle} = this.state
    const childId = createNode(newChildTitle).nodeId
    addChild(id, childId)
    this.setState({newChildTitle: ''})
  }

  handleRemoveClick = event => {
    event.preventDefault()

    const {removeChild, deleteNode, parentId, id} = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  handleNewChildTitleChange = event => {
    event.preventDefault()

    this.setState({newChildTitle: event.target.value})
  }

  handleToggleHiddenChildren = event => {
    const {toggleHiddenChildren, id} = this.props
    toggleHiddenChildren(id)
  }

  render() {
    const {done, title, id, parentId, childIds, parentDone, hiddenChildren} = this.props
    const {newChildTitle} = this.state
    const markedAsDone = done || parentDone

    return (
      <div>
        {typeof parentId !== 'undefined' && <div>
          <span style={{
            textDecoration: markedAsDone && 'line-through'
          }}>
            {title}
          </span>

          <input type="checkbox" disabled={parentDone} checked={done} onChange={this.handleDoneClick} />

          {Boolean(childIds.length) && <button onClick={this.handleToggleHiddenChildren} style={{boderStyle: 'none'}}>
            {hiddenChildren  ? 'open' : 'close'}
          </button>}

          <button disabled={markedAsDone} onClick={this.handleRemoveClick} style={{boderStyle: 'none'}}>x</button>
        </div>}

        <ul>
          <li key="add">
            <input
              disabled={markedAsDone}
              type="text"
              onChange={this.handleNewChildTitleChange}
              onKeyUp={this.handleAddChildClick}
              value={newChildTitle}
            />
          </li>

          {!hiddenChildren && childIds.map(childId => <li key={childId}>
            <ConnectedNode id={childId} parentId={id} parentDone={markedAsDone} />
          </li>)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
