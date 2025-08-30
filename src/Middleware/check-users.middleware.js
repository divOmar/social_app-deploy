import { User } from "../DB/models/user.model.js"




export const checkIfUsersExists=async(req,res,next)=>{
       try {
         let tags =req.body.tags 
         if(!Array.isArray(tags)){
            tags=[tags]
         }
        if(tags?.length){
        const users =await User.find({_id:{$in:tags}})
        if( tags?.length !== users?.length){
            return res.status(400).json({message:"invalid tags "})
        }
        }
        
       } catch (error) {
        console.log(error);
        
       }
        next()
}