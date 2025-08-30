import authRouter from "../Modules/Auth/auth.controller.js"
import { CommentRouter } from "../Modules/Comments/comments.controller.js"
import { postRouter } from "../Modules/Post/post.controller.js"
import { reactRouter } from "../Modules/Reacts/react.controller.js"
import userRouter from "../Modules/User/user.controller.js"
import { rateLimit } from 'express-rate-limit'

// const limiter=rateLimit({
//         windowMs:15*60*1000,
//         limit:2,
//         legacyHeaders:false
// })

const routerHandler=(app,express)=>{
// app.use(limiter)
// app.use("/Assets",express.static('Assets'))
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/comment",CommentRouter)
app.use("/react",reactRouter)
app.get("/",async(req,res)=>res.status(200).json({message:"hellofrom social app"}))
}


export default routerHandler