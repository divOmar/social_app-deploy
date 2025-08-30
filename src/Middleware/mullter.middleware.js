import multer from "multer";
import fs from 'fs'

// export const uploadMiddlewareHost =(desetinationPath='general',allawedExtention=[])=>{
//     const destinationFolder =`Assets/${desetinationPath}`
//     if (!fs.existsSync(destinationFolder)){
//         fs.mkdirSync(destinationFolder)
//     }
//     const storage= multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,destinationFolder)
//         },
//         filename:function(req,file,cb){
//             const uniqesuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
//             cb(null,uniqesuffix+'_'+file.originalname)
//         }
//     })

//     const fileFilter=(req,file,cb)=>{
//             if (allawedExtention.includes(file.mimetype)){
//                 cb(null,true)
//             }
//             else{
//                 cb(new Error("invailed file type"),false)
//             }
//         }
//     const upload=multer({fileFilter,storage})
//     return upload
// }
export const uploadCloud=(allawedExtention=[])=>{
   
    const storage= multer.diskStorage({})
    const fileFilter=(req,file,cb)=>{
            if (allawedExtention.includes(file.mimetype)){
                cb(null,true)
            }
            else{
                cb(new Error("invailed file type"),false)
            }
        }
    const upload=multer({fileFilter,storage})
    return upload
}