
const errorHandlerMiddleware = async(err,req,res,next)=>{

    if(err instanceof Error){
        return res.status(err.status).json({
            msg:err.message
        })
    }
    else{
        console.log('HERE')
        console.log(err)
        next()
    }
}

module.exports = errorHandlerMiddleware