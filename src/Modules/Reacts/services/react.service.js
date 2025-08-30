import { Reacts } from "../../../constants/constants.js"
import { Comment } from "../../../DB/models/comment.model.js"
import { Post } from "../../../DB/models/post.model.js"
import { React } from "../../../DB/models/reacts.model.js"





export const addReact =async (req,res)=>{
    const {_id:ownerId}=req.loggedinUser
    const {reactOnId}=req.params
    const {reactType,onModel}=req.body
       
        if(onModel=='Post'){
            const post =await Post.findOne({_id:reactOnId,allowedComments:true})
            if(!post){
                res.status(400).jsonq({message:"post are not found"})
            }
        }
        else if (onModel=="Comment"){
            const comment =await Comment.findOne({_id:reactOnId})
            if(!comment){
                res.status(400).jsonq({message:"comment are not found"})
            }
        }

        const reacts=Object.values(Reacts)
        if (!reacts .includes(reactType)){
            return res.status(404).json({message:"invalid react"})
        }


        const newReavt =await React.create({
            reactOnId,
            onModel,
            ownerId,
            reactType
        })
        res.status(200).json({newReavt})
}






export const deleteReact = async (req,res)=>{
    const {_id:ownerId}=req.loggedinUser
    const {reactOnId}=req.params

    const deletedReact =await React.findOneAndDelete({
        _id:reactOnId,
        ownerId
    })
    if(!deleteReact){
        return res.status(404).json({message:'failled to delete react'})
    }
        res.status(200).json({message:'react deleted successfuly'})
}