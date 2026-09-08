const express = require('express')

const app=express()

const cors=require('cors')

const {userRouter}=require('../backend/routes/user.js')

const {projectRouter} =require('../backend/routes/project.js')

const mongoose=require('mongoose')


app.use(cors())

app.use(express.json())

app.use('/user',userRouter)

app.use('/projects',projectRouter)

async function DBconnect(){
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connected")
    app.listen(3000,()=>console.log("http://localhost:3000/"))
    }
    catch(e){
        console.log(e)
    }

}

DBconnect()






