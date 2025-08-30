import { authenticationMiddleWare } from "../Middleware/auth.middleware.js"
import { sendMessageService } from "../Modules/User/services/chat.service.js"


const socketConnection=new Map()

export const regesterSocketId=async(handshake,id)=>{
         
        const accessToken=handshake.auth.accessToken
        
        const user =await authenticationMiddleWare(accessToken)
        
        socketConnection.set(user?._id?.toString(),id)
        console.log(socketConnection);
        return 'socet created successfully'
}


export const removeSocketId=async(socket)=>{
    return socket.on('disconnect',async()=>{
        const accessToken=socket.handshake.auth.accessToken
        const user =await authenticationMiddleWare(accessToken)
        socketConnection.delete(user?._id?.toString(),socket.id)
    })
}



export const establishIoConnection =(io)=>{
    return io.on("connection",async(Socket)=>{
            await regesterSocketId(Socket.handshake,Socket.id)
            await sendMessageService(Socket)
            await removeSocketId(Socket)
    })
}