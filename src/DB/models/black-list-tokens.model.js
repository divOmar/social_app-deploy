


import mongoose from "mongoose";


const blackListSchema =new mongoose.Schema({
    tokenId:{
        type:String,
        required:true,
        uniqe:true
    },
    expiredAt:{
        type:String,
        required:true
    }
},{timestamps:true})
     



const blackListTokens =mongoose.models.blackListSchema || mongoose.model("blackListTokens",blackListSchema)
export default blackListTokens