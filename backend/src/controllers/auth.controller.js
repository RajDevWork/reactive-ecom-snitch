import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bycrytjs from 'bcryptjs'

export const registerController = async(req,res)=>{
    const {fullname,email,contact,password} = req.body
    

}

export const loginController = async(req,res)=>{

}