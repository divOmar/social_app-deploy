import mongoose from "mongoose";





export const requestSchema= new mongoose.Schema({
        reqestedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        pendings:[{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}]
},{timestamps:true})




const Requests =mongoose.models.Requests || mongoose.model("Requests",requestSchema)



export {Requests}