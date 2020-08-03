const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.access_token;

  if (!token) res.status(401).json({ authMsg: 'No token, authorization denied', msg: 'Authorization denied, please sign in to confirm form' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY_SECRET)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Token is not valid' })
  }

}

module.exports = auth;