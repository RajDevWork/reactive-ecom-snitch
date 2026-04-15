import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bycrytjs from 'bcryptjs'
import { config } from "../config/config.js";

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

        //hash password
        const hashedPassowrd = bycrytjs.hash(password,10)

        //create user
        const user = await userModel.create({
            fullname,
            email,
            contact,
            password:hashedPassowrd
        })

        //create token
        const token = jwt.sign({
            id:user._id,
            email:user.email
        },config.JWT_SECRET,{expiresIn:'1d'})

        res.cookie("token",token)

        res.status(201).json({
            message:"User created successfully",
            user
        })
        




        
    } catch (error) {
        res.statu(500).json({
            message:"Server Error"
        })
    }


}

export const loginController = async(req,res)=>{

}