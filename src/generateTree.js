import cuid from 'cuid'
import Chance from 'chance'
const chance = new Chance()

export default function generateTree() {
  let tree = {
    0: {
      id: 0,
      done: false,
      title: 'ROOT',
      childIds: []
    }
  }

  for (let i = 1; i < 10; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    const done = Boolean(parentId % 2)
    tree[i] = {
      id: i,
      done: done,
      title: chance.sentence({words: 3}),
      childIds: []
    }
    tree[parentId].childIds.push(i)
  }

  return tree
}
