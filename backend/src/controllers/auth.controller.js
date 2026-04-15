import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { config } from "../config/config.js";

async function sendTokenResponse(user,res,message,statusCode){
     const token = jwt.sign({
            id:user._id,
            email:user.email
        },config.JWT_SECRET,{expiresIn:'1d'})

        res.cookie("token",token)

        res.status(statusCode).json({
            message,
            success:true,
            user
        })
}

export const registerController = async(req,res)=>{
    const {fullname,email,contact,password} = req.body
    try {

        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
        if(existingUser){
            res.status(409),json({
                message:"User with email or contact already exists"
            })
        }

        //create user
        const user = await userModel.create({
            fullname,
            email,
            contact,
            password
        })

        //create token and response send
        await sendTokenResponse(user,res,'User registered successfully',201)
        
    } catch (error) {
        res.statu(500).json({
            message:"Server Error"
        })
    }


}

export const loginController = async(req,res)=>{

}