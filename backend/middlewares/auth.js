const jwt=require('jsonwebtoken')

require('dotenv').config()

const express=require('express')

function logger(req,res,next){
    console.log(req.method+" "+req.url)
    next()
}

function authToken(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.status(400).send({"message":"no token found"})
    }
    
    const verifyToken=jwt.verify(token,process.env.JWT_SECRET)

    if(verifyToken){
        console.log("valid token")
        req.id=verifyToken.id
        next()
        
    }
    else{
        return res.status(400).json({"message":"Invalid token"})
    }
}

module.exports={
    authToken:authToken,
    logger:logger
}