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

  renderChild = childId => {
    const {id, done, parentDone} = this.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} parentDone={done || parentDone} />
      </li>
    )
  }

  handleNewChildTitleChange = event => {
    event.preventDefault()

    this.setState({newChildTitle: event.target.value})
  }

  render() {
    const {done, title, parentId, childIds, parentDone} = this.props
    const {newChildTitle} = this.state
    return (
      <div>
        <span style={{
          textDecoration: (done || parentDone) && 'line-through'
        }}>
          {title}
        </span>

        <input type="checkbox" disabled={parentDone} checked={done} onChange={this.handleDoneClick}/>

        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick}
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }

        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <input
              disabled={done || parentDone}
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
