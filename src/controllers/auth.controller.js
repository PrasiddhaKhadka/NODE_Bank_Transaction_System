const User = require('../models/user.models')
const { attachCookietoResponse } = require('../utils/jwt')
const sendMailAfterLogin = require('../utils/send_email')




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


const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  const isPasswordMatch = await user.comparePassword(password)

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  const tokenData = { userId: user._id, email: user.email }

  const token = attachCookietoResponse(res, tokenData)


   sendMailAfterLogin()

  res.status(200).json({
    message:'Success',
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    token
  })

}



module.exports = { register,login }
