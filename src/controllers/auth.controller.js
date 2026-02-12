const User = require('../models/user.models')
const { attachCookietoResponse } = require('../utils/jwt')




const register = async (req, res) => {

  const { email, password, name } = req.body

  const isExists = await User.findOne({ email })

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with email.",
      status: "failed"
    })
  }

  const newUser = await User.create({
    email,
    password,
    name
  })

  const tokenData = { userId: newUser._id, email: newUser.email }

  const token = attachCookietoResponse(res, tokenData)

  res.status(201).json({
    user: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name
    },
    token
  })
}

module.exports = { register }
