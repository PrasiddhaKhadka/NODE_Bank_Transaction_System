const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { createTransaction } = require('../controllers/transaction.controller')

const transactionRoutes = express.Router()



transactionRoutes.post('/',authMiddleware,createTransaction)



module.exports = transactionRoutes