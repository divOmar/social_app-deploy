import { Post } from "../../DB/models/post.model.js";
import { authenticationMiddleWare } from './../../Middleware/auth.middleware.js';









export const listAllPostsResolver=async()=>{
    const posts= await Post.find().populate([
        {
            path:"ownerId",
            select:"userName phone gender"
        }
    ])
    return posts
}

export const addPostsResolver=async(args)=>{

    const {accesstoken}=args
    const user = await authenticationMiddleWare(accesstoken)
    if(!user){
        return new Error("Please login first")
    }
    const {title,descreption,tags,allowedComments}=args
    const postObject={
        title,
        descreption,
        tags,
        ownerId,
        allowedComments
    }
    const post=await Post.create(postObject)    
    return "list all posts"
}