const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.KEY, (err, user) => {
    console.log(err)
    console.log('hiii');
    
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.KEY, { expiresIn: '300s' });
}

module.exports = { authenticateToken,generateAccessToken };