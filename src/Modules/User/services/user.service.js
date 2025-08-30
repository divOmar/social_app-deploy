import { Friends } from "../../../DB/models/friends.model.js";
import { Requests } from "../../../DB/models/requests.model.js";
import { User } from "../../../DB/models/user.model.js"
import { cloudinary } from './../../../config/cloudnairy.config.js';







export const uploadProfilePecture=async(req,res)=>{
    try {
        const {_id}= req.loggedinUser
        const {file}=req
        if(!file){
                    res.status(400).json({message:"failled uploaded "})
        }
        const url=`${req.protocol}://${req.headers.host}/${file.path}`
        const user =await User.findByIdAndUpdate(_id,{profilePecture:url},{new:true})
        res.status(200).json({message:"profile pecture uploaded successfuly",user})
    } catch (error) {
        console.log(error);
         res.status(400).json({message:"something went wrong",error:error.message})
    }
}






export const uploadCoverPecture=async(req,res)=>{
    try {
        const {_id}= req.loggedinUser
        const {files}=req
        if(!files?.length){
                    res.status(400).json({message:"failled uploaded "})
        }
        const images =files.map(file=>`${req.protocol}://${req.headers.host}/${file.path}`)

        
        const user =await User.findByIdAndUpdate(_id,{coverPicture:images},{new:true})
        res.status(200).json({message:"cover pecture uploaded successfuly",user})
    } catch (error) {
        console.log(error);
         res.status(400).json({message:"something went wrong",error:error.message})
    }
}




export const uploadPectureCloud = async(req,res)=>{
        const {_id}= req.loggedinUser
        const {file}=req
        if(!file){
                    res.status(400).json({message:"failled uploaded "})
        }
        const {secure_url,public_id} =await cloudinary().uploader.upload(file.path,{
            folder:`${process.env.CLOUDNARY_FOLDER}/user/profile`
        })
        const user= await User.findByIdAndUpdate(_id,{profilePecture:{secure_url,public_id}},{new:true})
        res.status(200).json({message:"profile pecture uploaded successfuly",user})
}




export const uploadCoverPectureCloud = async(req,res)=>{
        const {_id}= req.loggedinUser
        const {files}=req
        if(!files?.length){
                    res.status(400).json({message:"failled uploaded "})
        }
        const images=[]
        for (const file of files) {
            const {secure_url,public_id} =await cloudinary().uploader.upload(file.path,{
            folder:`${process.env.CLOUDNARY_FOLDER}/user/covers`
        })
        images.push({secure_url,public_id})
        }
        const user= await User.findByIdAndUpdate(_id,{coverPicture:images},{new:true})
        res.status(200).json({message:"cover pecture uploaded successfuly",user})
}




export const deleteProfile=async(req,res)=>{
        const {_id}= req.loggedinUser
        const deleteduser=await User.findByIdAndDelete(_id)
        const profilePublicId=deleteduser.profilePecture.public_id
        const coversPicture=deleteduser.coverPicture.map(c =>c.public_id)
        const data =await cloudinary().uploader.destroy(profilePublicId)
        const bulk =await cloudinary().api.delete_resources(coversPicture)
        console.log(bulk,data);
        res.status(200).json({message:"account deleted successfuly"})
        
}





export const updatePersonalData=async(req,res)=>{
    try {
        const {_id}=req.loggedinUser
        const { userName, email, phone, gender } = req.body;
    const user =await User.findById(_id)
    if(userName)  user.userName=userName
    if(email)  user.email=email
    if(phone)  user.phone=phone
    if(gender)  user.gender=gender
    await user.save()
    res.status(200).json({message:"personal data updated successfuky"})
    
    } catch (error) {
        console.log(error);
        
    }
}






export const getProfile=async(req,res)=>{
    const {_id}=req.loggedinUser
    const user =await User.findById(_id)
    res.status(200).json({message:"your profile",user})
}





export const sendFriendReqest= async(req,res)=>{
     const {_id}=req.loggedinUser
     const {requestToId}=req.params


     // check user id 
        const user =await User.findById(requestToId)
        if (! user){
            return res.status(404).json({message:"user not found "})
        }
        let request= null
        const requestExists = await Requests.findOne({reqestdBy:_id})
        if(requestExists){
            const isRequestExist =requestExists.pendings.includes(requestToId)
            if(isRequestExist){
                return res.status(400).json({message:"you have sent reqest already"})
            }
            
            requestExists.pendings.push(requestToId)
            request= await requestExists.save()
        }
        else{
            const newRequest= new Requests({
                reqestedBy:_id ,
                pendings:[requestToId]
            })
            request= await newRequest.save()
        }
        return res.status(200).json({message:"request has sent successfly",request})
}




export const accseptFriendRequest = async (req,res)=>{
    const {_id}=req.loggedinUser
    const {requestFromId}=req.params

    const reqest = await Requests.findOneAndUpdate({
        reqestedBy:requestFromId,pendings:{$in:{_id}}
    },
    {
            $pull:{pendings:_id}
    }
)
        let friend= null
        const hasFriends = await Friends.findOne({reqestdBy:_id})
        if(hasFriends){
            const isRequestExist =hasFriends.friends.includes(requestFromId)
            if(isRequestExist){
                return res.status(400).json({message:"you have sent reqest already"})
            }
            
            hasFriends.friends.push(requestFromId)
            friend= await hasFriends.save()
        }
        else{
            const newFriend= new Friends({
                userId:_id ,
                friends:[requestFromId]
            })
            friend= await newFriend.save()
        }
        return res.status(200).json({message:"request has accesept successfly",friend})
}




export const listFriends = async (req,res)=>{
     const {_id}=req.loggedinUser

     const friends =await Friends.findOne({userId:_id}).populate([
        {
            path:'friends',
            select:"userName"
        }
     ]).select('friends -_id')





       return res.status(200).json({message: 'friend list fetched successfully',user: req.loggedinUser,friends});

}