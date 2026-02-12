const express = require('express')

const app = express()

const authRouter = require('../src/routes/auth.routes')
const notFoundMiddleware = require('./middlewares/not_found.middleware')
const errorHandlerMiddleware = require('./middlewares/error.middleware')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth',authRouter)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


module.exports = app