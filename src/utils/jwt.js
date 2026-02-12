const jwt = require('jsonwebtoken')

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRIES_IN
  })
}

const attachCookietoResponse = (res, payload) => {
  const token = createJWT(payload)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })

  return token
}

module.exports = { createJWT, attachCookietoResponse }
