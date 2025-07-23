import jwt from "jsonwebtoken";

import User from "../models/user.js";

import asyncHandler from "./asyncHandler.js";

//check useris authenticated ir not

const authenticated = asyncHandler(async(req,res,next)=>{
    let token;
    token =req.cookies.jwt;
    if(token){
        try{
            const decoded =jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.userId).select('-password')
            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, no token.");
        }
    }else {
        res.status(401)
        throw new Error("Not authorizer ,no token.")
    }
})

//check if useris admin or not

const authorizeAdmin = (req,res,next) =>{
    if(req.user&& req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not authorized as an admin");
    }
}

export { authenticated , authorizeAdmin};