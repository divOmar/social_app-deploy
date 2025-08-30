import { Router } from "express";
import multer from "multer";
import { accseptFriendRequest, deleteProfile, getProfile, listFriends, sendFriendReqest, updatePersonalData, uploadCoverPecture, uploadCoverPectureCloud, uploadPectureCloud, uploadProfilePecture } from "./services/user.service.js";
import { uploadCloud, uploadMiddlewareHost } from "../../Middleware/mullter.middleware.js";
import { ImageExtAllowed } from "../../constants/constants.js";
import { authenticationMiddleWare } from "../../Middleware/auth.middleware.js";
import { getChatServiceStory } from "./services/chat.service.js";





const userRouter=Router()

userRouter.patch("/uploadfFilePhoto",authenticationMiddleWare(),uploadMiddlewareHost('users/profile',ImageExtAllowed).single('image'),uploadProfilePecture)
userRouter.patch("/uploadCoverPhoto",authenticationMiddleWare(),uploadMiddlewareHost('users/covers',ImageExtAllowed).array('covers',3),uploadCoverPecture)
userRouter.patch("/upload-cloud",authenticationMiddleWare(),uploadCloud(ImageExtAllowed).single('profile'),uploadPectureCloud)
userRouter.patch("/upload-covers-cloud",authenticationMiddleWare(),uploadCloud(ImageExtAllowed).array('covers',3),uploadCoverPectureCloud)
userRouter.delete("/delete-account",authenticationMiddleWare(),deleteProfile)
userRouter.patch("/update-personal-data",authenticationMiddleWare(),updatePersonalData)
userRouter.get("/getProfile",authenticationMiddleWare(),getProfile)
userRouter.post("/send-request/:requestToId",authenticationMiddleWare(),sendFriendReqest)
userRouter.patch("/accsept-request/:requestFromId",authenticationMiddleWare(),accseptFriendRequest)
userRouter.get("/list-friends",authenticationMiddleWare(),listFriends)
userRouter.get("/get-chat-history/:recivedId",authenticationMiddleWare(),getChatServiceStory)
export default userRouter