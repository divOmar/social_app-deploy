import { Router } from "express";
import { authenticationMiddleWare } from './../../Middleware/auth.middleware.js';
import { addPostServices, listPosts } from "./services/post.service.js";
import { uploadCloud } from "../../Middleware/mullter.middleware.js";
import { ImageExtAllowed } from "../../constants/constants.js";
import { checkIfUsersExists } from "../../Middleware/check-users.middleware.js";

const postRouter=Router()



postRouter.post("/createPost",authenticationMiddleWare(),uploadCloud(ImageExtAllowed).array('post',3),checkIfUsersExists,addPostServices)
postRouter.get("/listPosts",listPosts)

export {postRouter}