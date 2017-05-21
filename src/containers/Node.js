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

  render() {
    const {done, title, id, parentId, childIds, parentDone} = this.props
    const {newChildTitle} = this.state
    const markedAsDone = done || parentDone

    return (
      <div>
        <span style={{
          textDecoration: markedAsDone && 'line-through'
        }}>
          {title}
        </span>

        <input type="checkbox" disabled={parentDone} checked={done} onChange={this.handleDoneClick}/>

        {typeof parentId !== 'undefined' &&
          <button disabled={markedAsDone} onClick={this.handleRemoveClick} style={{boderStyle: 'none'}}>x</button>
        }

        <ul>
          {childIds.map(childId => <li key={childId}>
            <ConnectedNode id={childId} parentId={id} parentDone={markedAsDone} />
          </li>)}
          <li key="add">
            <input
              disabled={markedAsDone}
              type="text"
              onChange={this.handleNewChildTitleChange}
              onKeyUp={this.handleAddChildClick}
              value={newChildTitle}
            />
          </li>
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
