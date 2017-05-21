const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/test', () => {
  mongoose.connection.db.dropDatabase()
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('connected!')
})

const nodeSchema = mongoose.Schema({
    _id: {type: String, required: true},
    done: {type: Boolean, required: true},
    title: {type: String, required: true},
    childIds: {type: Array, required: false},
    hiddenChildren: {type: Boolean, required: true}
})

const Node = mongoose.model('Node', nodeSchema)

Node.create({
  _id: 'test123',
  title: 'node-01',
  done: false,
  childIds: [],
  hiddenChildren: false
}, (error, node) => {
  if (error) return console.log(error)
  console.log('CREATED NODE', node)

  Node.find((error, nodes) => {
    if (error) return console.log(error)
    return console.log(nodes)
  })
})

// Node.find({ title: '' }, callback);

const app = express()
app.use(bodyParser.json())
const apiPath = '/api/todos'

app.set('port', (process.env.PORT || 3001))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.get(`${apiPath}`, (req, res) => {
  Node.find((error, nodes) => {
    if (error) return console.log(error)
    console.log(nodes)
    return res.json(nodes)
  })
})

app.post(`${apiPath}`, (req, res) => {
  console.log('working POST', req.body)
  res.json({stuff: 'working POST'})
})

app.put(`${apiPath}`, (req, res) => {
  console.log('working PUT', req.body)
  res.json({stuff: 'working PUT'})
})

app.delete(`${apiPath}/:id`, (req, res) => {
  console.log('working DELETE', req.params)
  res.json({stuff: 'working DELETE'})
})

app.listen(app.get('port'), () => {
  console.log(`Server started at: http://localhost:${app.get('port')}/`)
})
