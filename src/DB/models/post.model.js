



import mongoose from "mongoose";


import mongoosePaginate from "mongoose-paginate-v2";




const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    descreption:String,
    ownerId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    tags:[{type:mongoose.Schema.ObjectId,ref:'User'}],
    allowedComments:{
        type:Boolean,
        default:true
    },
    images:{
        urls:[{
            secure_url:String,
            public_id:String
        }],
        folderId:String
    }

},{timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

postSchema.virtual('Comments',{
    ref:"Comment",
    localField:"_id",
    foreignField:"commentOnId"
})

postSchema.virtual('React',{
    ref:"React",
    localField:"_id",
    foreignField:"reactOnId"
})


postSchema.plugin(mongoosePaginate)

const Post=mongoose.models.Post || mongoose.model("Post",postSchema)
export{Post}