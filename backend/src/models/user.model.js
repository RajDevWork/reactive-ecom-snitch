import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer'
    }

},{
    timestamps:true
})

const userModel = mongoose.model('users',userSchema)
export default userModel