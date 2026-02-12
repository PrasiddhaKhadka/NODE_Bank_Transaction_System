const { isTokenValid } = require("../utils/jwt")

const authMiddleware = async(req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(token){
        const user = isTokenValid({token})
        if(!user){
            res.status(401).json({
                status:'Failed',
                message:'Invalid user token'
            })
        }
        req.user = {
            userId: user.userId,
            email:user.email
        }

        next()


    }
    else{
        res.status(401).json({
                        status:'Failed',
                        message:'Invalid user token'
        })
    }

}


module.exports = authMiddleware