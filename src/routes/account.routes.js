const express = require("express")
const { createAccount, getUserAccount } = require("../controllers/account.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const accountRouter = express.Router()


accountRouter.post('/',authMiddleware, createAccount)
accountRouter.get('/',authMiddleware, getUserAccount)




module.exports = accountRouter