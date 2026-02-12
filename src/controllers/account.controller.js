const accountModel = require("../models/account.models");

const createAccount = async(req,res)=>{

    const user = req.user;

    const account = await accountModel.create({
        user: user.userId
    })

    res.status(201).json({
        account
    })
}


const getUserAccount = async(req,res)=>{
    
    const accounts = await accountModel.find({ user: req.user.userId });

    res.status(200).json({
        accounts
    })
}





module.exports = { createAccount, getUserAccount }