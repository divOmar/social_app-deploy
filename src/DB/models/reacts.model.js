import mongoose from "mongoose";
import { Reacts } from "../../constants/constants.js";

const reactsSchema=new mongoose.Schema({
    reactOnId:{type:mongoose.Schema.Types.ObjectId,ref:'onModel',required:true},
    onModel:{
        type:String,
        enum:['Post','Comment']
    },
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    reactType:{
        type:String,
        enum:Object.values(Reacts)
    }
},{timestamps:true})



 const React=mongoose.models.React || mongoose.model('React',reactsSchema)

export {React}