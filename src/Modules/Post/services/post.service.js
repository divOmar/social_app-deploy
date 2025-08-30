import { nanoid } from "nanoid"
import { User } from "../../../DB/models/user.model.js"
import { cloudinary } from './../../../config/cloudnairy.config.js';
import { Post } from "../../../DB/models/post.model.js";
import { pagination } from "../../../utils/paginiation.js";





export const addPostServices=async(req,res)=>{
    const {_id:ownerId}=req.loggedinUser
    
    
    
    const {title,descreption,tags,allowedComments}=req.body
    const postObject={
        title,
        descreption,
        tags,
        ownerId,
        allowedComments
    }
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
        postObject.images=images
    }


    const post=await Post.create(postObject)
    res.status(200).json({message:"post created successfuly",post})
}






export const listPosts=async(req,res)=>{
    const {page,limit}=req.query
    const {skip ,limit: calculateLimit}=pagination(page,limit)
    // const posts =await Post.find().limit(calculateLimit).skip(skip).populate([
    //     {
    //         path:"Comments"
    //     }
    // ])
    const posts = await Post.paginate({},{limit,page,sort:{createdAt:-1}})
    res.status(200).json({message:"posts",posts})
}