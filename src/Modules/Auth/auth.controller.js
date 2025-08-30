import { Router } from "express";
import { confirmEmailServices, signInservices, signUpServices } from "./services/authentication.service.js";




const authRouter=Router()
authRouter.post("/signup",signUpServices)
authRouter.post("/login",signInservices)
authRouter.put("/verfiyEmail",confirmEmailServices)



export default authRouter