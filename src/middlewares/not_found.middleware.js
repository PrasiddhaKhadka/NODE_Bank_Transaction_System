const { StatusCodes } = require('http-status-codes');


const notFoundMiddleware = (req,res,next)=>{
    return res.status(StatusCodes).json({
        msg:'Resource Not Found'
    })
}


module.exports = notFoundMiddleware