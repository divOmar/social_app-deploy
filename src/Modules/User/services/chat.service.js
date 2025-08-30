import { Chat } from "../../../DB/models/chat.model.js"
import { authenticationMiddleWare } from "../../../Middleware/auth.middleware.js"








export const getChatServiceStory = async (req,res)=>{
        const {_id}=req.loggedinUser
        const {recivedId}=req.params
        

        const chat =await Chat.findOne({
            $or:[
                {senderId:_id,recivedId},{recivedId:_id,senderId:recivedId}
            ]
        }).populate([
            {
                path:'senderId',
                select:"userName profilePecture"
            },
            {
                path:'recivedId',
                select:"userName profilePecture"
            },
            {
                path:'messages',
                select:"userName profilePecture"
            }
        ])


        return res.status(200).json({message:"chat history fitched ",chat})
} 






export const sendMessageService = async (socket) => {
  return socket.on("sendMessage", async (message) => {
    try {
      const loggedinUser = await authenticationMiddleWare(socket.handshake.auth.accesstoken);
      const { recivedId, body } = message;

      // Find chat and update (push message if exists)
      let chat = await Chat.findOneAndUpdate(
        {
          $or: [
            { senderId: loggedinUser._id, recivedId },
            { senderId: recivedId, recivedId: loggedinUser._id }
          ]
        },
        {
          $addToSet: {
            messages: {
              body,
              senderId: loggedinUser._id
            }
          }
        },
        { new: true } // return the updated doc
      );

      // If chat does not exist, create it
      if (!chat) {
        chat = new Chat({
          senderId: loggedinUser._id,
          recivedId,
          messages: [
            {
              body,
              senderId: loggedinUser._id
            }
          ]
        });
        await chat.save();
      }

      // Emit success event
      socket.emit("successMessage", { body, chat });
    } catch (err) {
      console.error("sendMessageService error:", err.message);
      socket.emit("errorMessage", { error: "Failed to send message" });
    }
  });
};
