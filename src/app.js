const express = require('express')

const app = express()

const authRouter = require('../src/routes/auth.routes')
const notFoundMiddleware = require('./middlewares/not_found.middleware')
const errorHandlerMiddleware = require('./middlewares/error.middleware')
const cookieParser = require('cookie-parser')
const accountRouter = require('./routes/account.routes')
const transactionRoutes = require('./routes/transaction.routes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).json({
        status:'success',
        msg:'Bank Transaction system is working fine'
    })
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/account',accountRouter)
app.use('/api/v1/transactions',transactionRoutes)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


module.exports = app