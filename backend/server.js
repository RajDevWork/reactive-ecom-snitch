import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()
const PORT = process.env.PORT || 3000

//listen and start server

const startServer = async ()=>{

    try{

        app.listen(PORT, ()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })

    }catch(error){
        console.log(`Failed to start the server: ${error}`)
        process.exit(1)
    }

}
startServer()