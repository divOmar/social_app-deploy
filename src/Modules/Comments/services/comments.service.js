import { nanoid } from "nanoid"
import { Post } from "../../../DB/models/post.model.js"
import { cloudinary } from "../../../config/cloudnairy.config.js"
import { Comment } from "../../../DB/models/comment.model.js"






export const addComment=async(req,res)=>{
    const {_id:ownerId}=req.loggedinUser
    const {content,tags,onModel}=req.body
    const {commentOnId}=req.params
    const commentObject={
        content,
        ownerId,
        tags
    }
          
        if(onModel=='post'){
            const post =await Post.findOne({_id:commentOnId,allowedComments:true})
            if(!post){
                res.status(400).jsonq({message:"post are not found"})
            }
        }
        else if (onModel=="comment"){
            const comment =await Comment.findOne({_id:commentOnId})
            if(!comment){
                res.status(400).jsonq({message:"comment are not found"})
            }
        }
            commentObject.commentOnId=commentOnId
            commentObject.onModel=onModel

               let images =null
                if(req.files?.length){
                    const folderId =nanoid(4)
                    images={
                        urls:[],
                        folderId
                    }
                    for (const file of req.files) {
                        const {secure_url,public_id}=await cloudinary().uploader.upload(file.path,{
                            folder:`${process.env.CLOUDNARY_FOLDER}/posts/${folderId}`
                        })
                        images.urls.push({secure_url,public_id})
                    }
                    commentObject.images=images
                }
                const comment= await Comment.create(commentObject)
            res.status(200).json(comment)
}







export const listAllComments= async(req,res)=>{
    const comments =await Comment.find().populate({
        path:"commentOnId"
    })
    res.status(200).json({comments})
}