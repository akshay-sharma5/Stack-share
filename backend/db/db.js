const mongoose=require('mongoose')

require('dotenv').config()

const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId


const userSchema=new Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:String,
    role:{type:String,enum:['user','admin'],default:'user',required:true},
    createdAt:{type:Date,default:Date.now}
})

const projectSchema=new Schema({
    title:String,
    description:String,
    technologies:[String],
    repoLink:String,
    liveLink:String,
    status:{type:String,enum:['completed','pending'],default:'pending'},
    createdAt:{type:Date,default:Date.now},
    author:{type:ObjectId,ref:'User'},
    members:[{type:ObjectId,ref:'User'}],
    pendingRequests:[{type:ObjectId,ref:'User'}]
})

const messageSchema=new Schema({
    projectId:{type:ObjectId,ref:'Project',required:true,index:true},
    sender:{type:ObjectId,ref:'User',required:true},
    content:{type:String,required:true,trim:true},

},{timestamps:true})

const User=mongoose.model('User',userSchema)

const Project=mongoose.model('Project',projectSchema)

const Message=mongoose.model('Message',messageSchema)


module.exports={
    User:User,
    Project:Project,
    Message:Message
};

