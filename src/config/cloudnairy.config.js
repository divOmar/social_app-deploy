


import {v2 as cloudinaryV2} from "cloudinary"



export const cloudinary=()=>{
    cloudinaryV2.config({
        cloud_name:process.env.CLOUDNARY_NAME,
        api_key:process.env.CLOUDNARY_KEY,
        api_secret:process.env.CLOUDNARY_SECRET
    })
    return cloudinaryV2
}
