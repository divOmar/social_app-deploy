
import blackListTokens from '../DB/models/black-list-tokens.model.js';
import { User } from '../DB/models/user.model.js';
import  jwt  from 'jsonwebtoken';



const validateUserToken = async (accessToken) => {
    const decodedData = jwt.verify(accessToken.toString(), process.env.JWT_SECRET)

    // check if blacklisted
    const isTokenBlackListed = await blackListTokens.findOne({ tokenId: decodedData.jti })
    if (isTokenBlackListed) throw new Error("Token blacklisted")

    // fetch user
    const user = await User.findById(decodedData._id, '-password')
    if (!user) throw new Error("User not found")

    return {
        user,
        token: { tokenId: decodedData.jti, expiredAt: decodedData.exp }
    }
}


export const authenticationMiddleWare = (socketToken) => {
    // Case 1: Socket authentication
    if (socketToken) {
        return validateUserToken(socketToken)  // returns { user, token }
    }

    // Case 2: Express middleware
    return async (req, res, next) => {
        try {
            const { accesstoken } = req.headers
            if (!accesstoken) {
                return res.status(401).json({ message: "You are not logged in" })
            }

            const { user, token } = await validateUserToken(accesstoken)

            req.loggedinUser = user
            req.loggedinUser.token = token

            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: "Invalid or expired token" })
        }
    }
}
export const authorizaitionMiddleware=(allawRolles)=>{
    return async (req,res,next)=>{
        try {
            const {role}=req.loggedinUser
            const isRoleAllawed= allawRolles.includes(role)
            if(!isRoleAllawed)return res.status(401).json({massege:"unauthorized"})
            next()
        } catch (error) {
            console.log(error);
            res.status(404).json({massege:"something went wrong"})
        }
    }
}