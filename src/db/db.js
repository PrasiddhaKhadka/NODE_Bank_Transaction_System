const mongoose = require('mongoose')

const connectDb = async(dbURL)=>{
    try {
        await mongoose.connect(dbURL)   
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDb