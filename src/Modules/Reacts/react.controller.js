import { Router } from "express";
import { authenticationMiddleWare } from "../../Middleware/auth.middleware.js";
import { addReact, deleteReact } from "./services/react.service.js";



const reactRouter = Router()


reactRouter.post("/add-react/:reactOnId",authenticationMiddleWare(),addReact)
reactRouter.delete("/delete-react/:reactOnId",authenticationMiddleWare(),deleteReact)



export {reactRouter}