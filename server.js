const dotenv = require('dotenv')

const app = require('./src/app')
const connectDb = require('./src/db/db')


dotenv.config()



app.listen(8000,async()=>{
    try {
        await connectDb(process.env.MONGODB_URL).then(()=>{
        console.log('🔥 Connected to Database')
        console.log('🔥 Server is running successfully @80000')
        })
    } catch (error) {
        console.log('🔥 error')   
    }

})