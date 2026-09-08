const {Router}=require('express')

const userRouter=Router()

const jwt=require('jsonwebtoken')


const {verify,verifySignin}=require('../validators/types')

const {User}=require('../db/db')

const {logger,authToken}=require('../middlewares/auth')

const bcrypt=require('bcrypt')


userRouter.post('/signup',logger,async (req,res)=>{

    const result=verify(req.body)
    if(Array.isArray(result)){
       return res.status(400).json({"error":result})
    }else{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;

        const findUser=await User.findOne({email:email})

        if(findUser){
            return res.status(400).json({"message":"user already exist"})
        }

        const hashedPassword=await bcrypt.hash(password,5)

        await User.create({
            email:email,
            name:name,
            password:hashedPassword
        })

        return res.json("User signedup succesfully")

    }
})

userRouter.post('/signin',logger,async (req,res)=>{
     const result=verifySignin(req.body)
    if(Array.isArray(result)){
       return res.status(400).json({"error":result})
    }else{
        const email=req.body.email;
        const password=req.body.password;

        const Usr=await User.findOne({email:email})

        if(Usr){
            const verifyPwd=await bcrypt.compare(password,Usr.password)
            if(!verifyPwd){
                return res.status(400).json({"message":"Invalid password"})
            }
            else{
                const token=jwt.sign({"id":Usr._id},process.env.JWT_SECRET)
                res.json({"message":"Signed in succesfully","token":token})
            }

        }
        else{
            return res.send({"message":"User doesnt exist"})
        }
    
    }
})


userRouter.get('/profile',logger,authToken,async(req,res)=>{
    const Usr=await User.findOne({_id:req.id})
    res.json({
        "email":Usr.email,
        "name":Usr.name
    })

})

module.exports={
    userRouter:userRouter
}

