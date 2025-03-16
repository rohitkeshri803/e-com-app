import { response } from "express"
import userModels from "../models/userModels.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import JWT from 'jsonwebtoken'

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address}=req.body
        // validations
        if(!name){
            return res.send({message:'Name is Required'})
        }

        if(!email){
            return res.send({message:'email is Required'})
        }

        if(!password){
            return res.send({message:'password is Required'})
        }

        if(!phone){
            return res.send({message:'phone is Required'})
        }

        if(!address){
            return res.send({message:'address is Required'})
        }

        // check user
        const existingUser = await userModels.findOne({email})
        // existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already registered , please login',
            })
        }

        // register user
        const hashedPassword= await hashPassword(password)
        // save
        const user =await new userModels({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user:user,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error in Registration`,
            error 
        })
        

    }
}



export const loginController = async (req,res) => {
    try {
        const {email,password}=req.body
        // validations
        
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        
        // check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not registered'
            })
        }

        const match = await comparePassword(password, user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:'password is incorrect'
            })
        }

        // token 
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:'7d',

        })

        res.status(200).send({
            success:true,
            message: 'Login successful',
            user: {
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error in Login`,
            error 
        })
        

    }
}

export const testController=(req,res)=>{
    console.log("protected route");
    res.send("protected routes")
}