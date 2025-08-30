import mongoose from "mongoose";




const chatSchema= new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    recivedId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    messages:[{
        body:{type:String,required:true},
        senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        setAt:{type:Date,default:Date.now()}
    }]
})




const Chat = mongoose.models.Chat || mongoose.model("Chat",chatSchema)




export {Chat}