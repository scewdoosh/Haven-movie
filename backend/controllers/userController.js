import User from "../models/user.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";

import createToken from "../utils/createToken.js"
import { authenticated } from "../middlewares/authMiddleware.js";

const createUser= asyncHandler(async(req,res)=>{
    const { username , email , password } = req.body;
    if(!username  || !email || !password) {
        throw new Error("Please fill all the fields")
    }

    const userExists = await User.findOne({email});
    if(userExists)res.status(400).send("User already exists")

    //hashing the user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new User({username,email,password: hashPassword})
    try{
        await newUser.save()
        createToken(res,newUser._id)

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email:newUser.email,
            isAdmin: newUser.isAdmin,
        })
    }catch(error){
        res.status(400)
        throw new Error("Invalid user details");
    }
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email , password }= req.body;
    // console.log(email);
    // console.log(password);
    const existingUser = await User.findOne({email});
    if(existingUser){
        const isPasswordVallid = await bcrypt.compare(password, existingUser.password);
        if(isPasswordVallid){
             createToken(res,existingUser._id);
             res.status(201).json({
                _id : existingUser._id,
                username:existingUser.username,
                email:existingUser.email,
                isAdmin:existingUser.isAdmin,
             });
        }else{
        res.status(401).json({message:"Password invalid"});
        }
    }else{
        res.status(401).json({message:"User not found"});
    }
})

const logCurrentUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly : true,
        expires: new Date(0),
    })
    res.status(200).json({message:"Logged out successfully"});
})

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.json(users);
})

const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id :user._id,
            username: user.username,
            email:user.email
        });
    }else {
        res.status(404);
        throw new Error("User not Found");
    }

})

const updateTheCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.username=req.body.username || user.username ;
        user.email= req.body.email ||user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password,salt)
            user.password = hashPassword
        }

    const updateUser = await user.save();
    
    
    res.json({
        _id:updateUser._id,
        username: updateUser.username,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
    })
}else{
    res.status(404)
    throw new Error("User not found");
}

    
})

export {createUser , loginUser , logCurrentUser , getAllUsers , getCurrentUserProfile , updateTheCurrentUserProfile};