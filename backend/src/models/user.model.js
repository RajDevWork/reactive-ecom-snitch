import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
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


//password ko hash karna before save
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
})

//compare current password and hashed password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}






const userModel = mongoose.model('users',userSchema)
export default userModel