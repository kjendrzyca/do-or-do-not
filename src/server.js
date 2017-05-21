const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/test', () => {
  mongoose.connection.db.dropDatabase()
})

const nodeSchema = mongoose.Schema({
    _id: {type: String, required: true},
    done: {type: Boolean, required: true},
    title: {type: String, required: true},
    childIds: {type: Array, required: false},
    hiddenChildren: {type: Boolean, required: true}
})

nodeSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id
         delete ret._id
         delete ret.__v
     }
})

const Node = mongoose.model('Node', nodeSchema)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function() {
  console.log('connected!')
  Node.find((error, nodes) => {
    if (error) return console.log(error)
    return console.log('ALL DATA:', nodes)
  })
})

const handleError = error => console.log(error)

const app = express()
app.use(bodyParser.json())
const apiPath = '/api/todos'

app.set('port', (process.env.PORT || 3001))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.get(`${apiPath}`, (req, res) => {
  Node.find((error, nodes) => {
    if (error) return handleError(error)
    return res.json(nodes)
  })
})

app.post(`${apiPath}`, (req, res) => {
  const {
    id, title, done, childIds, hiddenChildren
  } = req.body

  Node.create({
    _id: id,
    title: title,
    done: done,
    childIds: childIds,
    hiddenChildren: hiddenChildren
  }, (error, node) => {
    if (error) return handleError(error)
    console.log('created node:', node)
    res.json(node)
  })
})

app.put(`${apiPath}`, (req, res) => {
  const {
    id, title, done, childIds, hiddenChildren
  } = req.body

  console.log('requested body:', req.body)

  Node.findById(id, (error, node) => {
    if (error) return handleError(error)

    node.title = title
    node.done = done
    node.childIds = childIds
    node.hiddenChildren = hiddenChildren

    node.save(function (error, updatedNode) {
      if (error) return handleError(error)
      console.log('updatedNode node:', node)
      res.json(updatedNode)
    })
  })
})

app.delete(`${apiPath}/:id`, (req, res) => {
  const {id} = req.params
  Node.deleteOne({ _id: id }, error => {
    if (error) return handleError(error)
    res.json({})
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server started at: http://localhost:${app.get('port')}/`)
})
