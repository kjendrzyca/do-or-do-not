import Chance from 'chance'
const chance = new Chance()

export default function generateTree() {
  let tree = {
    '0': {
      id: '0',
      done: false,
      title: 'ROOT',
      childIds: [],
      hiddenChildren: false
    }
  }

  for (let i = 1; i < 10; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    const done = Boolean(parentId % 2)
    tree[i.toString()] = {
      id: i.toString(),
      done: done,
      title: chance.sentence({words: 3}),
      childIds: [],
      hiddenChildren: false
    }
    tree[parentId].childIds.push(i.toString())
  }

  return tree
}
