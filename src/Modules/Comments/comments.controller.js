import { Router } from "express";
import { authenticationMiddleWare } from "../../Middleware/auth.middleware.js";
import { uploadCloud } from "../../Middleware/mullter.middleware.js";
import { checkIfUsersExists } from "../../Middleware/check-users.middleware.js";
import { addComment, listAllComments } from "./services/comments.service.js";
import { ImageExtAllowed } from "../../constants/constants.js";





const CommentRouter=Router()

CommentRouter.post("/createCOmment/:commentOnId",authenticationMiddleWare(),uploadCloud(ImageExtAllowed).array('post',3),checkIfUsersExists,addComment)
CommentRouter.get("/List-comments",authenticationMiddleWare(),listAllComments)
export{CommentRouter}