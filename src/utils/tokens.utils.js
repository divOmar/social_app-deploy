


import jwt from "jsonwebtoken"



export const generateToken=({
    publicClaims,
    registeredClaims,
    secretKey=process.env.JWT_SECRET
})=>{
    return jwt.sign(publicClaims,secretKey,registeredClaims)
}



export const verfiyToken=(accessToken,secertKey)=>{
        return jwt.verify(accessToken.toString(),secertKey)
}