import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
import { config } from './config/config.js'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'


const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:config.GOOGLE_CALLBACK_URL
},(accessToken,refreshToken,profile,done)=>{
    // Here you can handle the user profile returned by Google
    // For example, you can find or create a user in your database
    // and then call done(null, user) to pass the user to
    // the next middleware
    // console.log(profile)
    // done(null, profile)
    return done(null, profile)
}))




app.use("/api/auth",authRouter)



export default app