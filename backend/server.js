import app from './src/app.js'
import connectDB from './src/config/db.js'
const PORT = process.env.PORT || 3000


//listen and start server

const startServer = async ()=>{
    try{
        await connectDB()
        app.listen(PORT, ()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })

    }catch(error){
        console.log(`Failed to start the server: ${error}`)
        process.exit(1)
    }

}
startServer()