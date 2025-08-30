

import express from "express"
import { databaseConnection } from "./DB/connection.js"
import routerHandler from "./utils/router-handler.utils.js"
import path from "path"
import { config } from "dotenv"
import helmet from "helmet"
import cors from 'cors'
import { Server } from "socket.io"
import { authenticationMiddleWare } from "./Middleware/auth.middleware.js"
import { establishIoConnection } from "./utils/socket.utils.js"
config({path:path.resolve(`./.dev.env`)})









const bootstrap=()=>{
    const app=express()
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    routerHandler(app,express)
    databaseConnection()
    const server=app.listen(3000,()=>{
        console.log("app is running on port 3000");
    })
    const io =new Server(server,{
        cors:{
            origin:'*'
        }
    })




    establishIoConnection(io)
    
}

export default bootstrap