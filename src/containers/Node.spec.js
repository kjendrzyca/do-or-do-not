import React from 'react'
import { shallow } from 'enzyme'
import ConnectedNode, { Node } from './Node'

function setup(id, done, title, childIds, parentId) {
  const actions = {
    toggleDone: jest.fn(),
    removeChild: jest.fn(),
    deleteNode: jest.fn(),
    createNode: jest.fn(),
    addChild: jest.fn()
  }

  const eventArgs = {
    preventDefault: jest.fn()
  }

  const component = shallow(
    <Node id={id} done={done} title={title} parentId={parentId} childIds={childIds} {...actions} />
  )

  return {
    component: component,
    removeLink: component.findWhere(n => n.type() === 'a' && n.contains('×')),
    addLink: component.findWhere(n => n.type() === 'a' && n.contains('Add child')),
    checkbox: component.find('checkbox'),
    childNodes: component.find(ConnectedNode),
    actions: actions,
    eventArgs: eventArgs
  }
}

describe('Node component', () => {
  it('should display title', () => {
    const { component } = setup(1, false, 'some title', [])
    expect(component.text()).toMatch(/^some title/)
  })

  it('should not render remove link', () => {
    const { removeLink } = setup(1, false, 'some title', [])
    expect(removeLink.length).toEqual(0)
  })

  it('should call createNode action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, false, 'some title', [])
    actions.createNode.mockReturnValue({ nodeId: 3 })
    addLink.simulate('click', eventArgs)

    expect(actions.createNode).toBeCalled()
  })

  it('should call addChild action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, false, 'some title', [])
    actions.createNode.mockReturnValue({ nodeId: 3 })

    addLink.simulate('click', eventArgs)

    expect(actions.addChild).toBeCalledWith(2, 3)
  })

  describe('when given childIds', () => {
    it('should render child nodes', () => {
      const { childNodes } = setup(1, false, 'some title', [ 2, 3 ])
      expect(childNodes.length).toEqual(2)
    })
  })

  describe('when given parentId', () => {
    it('should call removeChild action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, false, 'some title', [], 1)
      removeLink.simulate('click', eventArgs)

      expect(actions.removeChild).toBeCalledWith(1, 2)
    })

    it('should call deleteNode action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, false, 'some title', [], 1)
      removeLink.simulate('click', eventArgs)

      expect(actions.deleteNode).toBeCalledWith(2)
    })
  })
})
