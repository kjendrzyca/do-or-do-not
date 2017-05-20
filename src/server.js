const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3001))

console.log('NODE ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.listen(app.get('port'), () => {
  console.log(`Server started at: http://localhost:${app.get('port')}/`)
})
