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


projectRouter.delete('/',logger,authToken,async (req,res)=>{
    const projectId=req.body.projectId;

    const project=await Project.deleteOne({_id:projectId})

    res.json({"message":"Project deleted succesfully"})
})

projectRouter.put('/',logger,authToken,async(req,res)=>{

    let updateData={}

    const projectId=req.body.projectId

    const response = await Project.findOne({_id:projectId})

    if(!response) {
        return res.status(400).json({"message":"Project not found"})
    }


    if(req.body.title) updateData.title=req.body.title
    if(req.body.description) updateData.description=req.body.description
    if(req.body.technologies) updateData.technologies=req.body.technologies
    if(req.body.repoLink) updateData.repoLink=req.body.repoLink
    if(req.body.liveLink) updateData.liveLink=req.body.liveLink
    if(req.body.status) updateData.status=req.body.status


    if(Object.keys(updateData).length === 0) {
    return res.status(400).json({"message":"No data to update"})
    }
    else{

    

    console.log(updateData)

    const project=await Project.updateOne(
        {_id:projectId},
        {$set:updateData}
    )

    res.json({"message":"Project updated successfully"})
    }

})


