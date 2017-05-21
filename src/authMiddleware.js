const basicAuth = require('basic-auth')
if (!process.env.PASS) {
  throw new Error('PASS env variable not set')
}
const [secretUser, secretPass] = process.env.PASS.split(':')

module.exports = function (req, res, next) {
  if (!req.path.includes('/api')) {
    return next()
  }
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    return res.sendStatus(401)
  };

  const user = basicAuth(req)

  if (!user || !user.name || !user.pass) {
    return unauthorized(res)
  };

  if (user.name === secretUser && user.pass === secretPass) {
    return next()
  } else {
    return unauthorized(res)
  }
}
