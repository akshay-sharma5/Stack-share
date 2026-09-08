import {Router} from 'express'

export const projectRouter=Router()

import {logger,authToken} from '../middlewares/auth.js'

import {Project} from '../db/db.js'
import mongoose from 'mongoose'

projectRouter.get('/all',logger,async(req,res)=>{
    const response=await Project.find({})
    console.log(response)
    res.json(response)

})

projectRouter.post('/',logger,authToken,async(req,res)=>{
    
    console.log(req.body)

    const title=req.body.title;
    const description=req.body.description;
    const technologies=req.body.technologies;
    const repoLink=req.body.repoLink
    const liveLink=req.body.liveLink
    const author=req.id;

    console.log(req.body)

    await Project.create({
        title:title,
        description:description,
        technologies:technologies,
        repoLink:repoLink,
        liveLink:liveLink,
        author:new mongoose.Types.ObjectId(author)

    })

    res.json({"message":"Project added sucessfully"})
})


