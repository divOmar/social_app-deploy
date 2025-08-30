import { compareSync, hashSync } from "bcrypt";
import { User } from "../../../DB/models/user.model.js";
import { encryption } from './../../../utils/encryption.utils.js';
import { SendEmailServices } from "../../../services/send-email.service.js";
import { generateToken } from "../../../utils/tokens.utils.js";
import { v4 as uuid4 } from "uuid";
import {OAuth2Client} from "google-auth-library"




export const signUpServices=async(req,res)=>{
        const {userName,email,password,phone,gender,DOB,privateAccount}=req.body
        try {


            //check if email exist
            const isEmailExist=await User.findOne({email})
            if(isEmailExist)return res.status(400).json({message:"email is elready exist"})
            
            //////////////////////////////////////////
                //hash password
                // const hashedPassword=hashSync(password,+process.env.SALT)
                
                /////////////////////////////////////////////
                //encrypt phone 
                // const encryptedPhone=await encryption({value:phone,secertKey:process.env.ENCRYPTED_KEY})
                ///////////////////////////////////////////////////
                const isPublic=privateAccount? false:true
                ////////////////////////////////////////
                const OTP= Math.floor(100000+Math.random()*90000).toString()
                const hasedOtp=hashSync(OTP,+process.env.SALT)
        const isEmailSent=await SendEmailServices({
        to:email,
        subject:"your otp",
        html:
        `  <h1>Confirm your email</h1>
                <p>${OTP}</p>`,   
        })
        console.log("isEmailSent result:", isEmailSent);
        const user=await User.create({userName,email,password,phone,DOB,gender,isPublic,confirmOtp:hasedOtp})
        res.status(200).json({message:"user created successfuly"})
        } catch (error) {
            console.log(error);
            
        }
}



export const confirmEmailServices=async(req,res)=>{
    const{otp,email}=req.body
    const user=await User.findOne({email,isVerified:false,confirmOtp:{$exists:true}})
    if(!user)return res.status(400).json({message:"email is not exist"})
    const isOTPMatched=compareSync(otp,user.confirmOtp)
        if(!isOTPMatched)return res.status(400).json({message:"invalled otp"})
    await User.findByIdAndUpdate(user._id,{isVerified:true,$unset:{confirmOtp:""}})
    res.status(200).json({message:"your email verfied sucessfully"})
}





export const signInservices=async(req,res)=>{
    try {
        const {email,password}=req.body
         const user=await User.findOne({email,isVerified:true})
        if(!user)return res.status(400).json({message:"email is not exist"})
        const accessToken=generateToken({
         publicClaims:{_id:user._id},
    registeredClaims:{expiresIn:process.env.ACCESS_TOKEN_EXPIRATION_TIME,jwtid:uuid4()},
    secretKey:process.env.JWT_SECRET
        })
        const refreshToken=generateToken({
            publicClaims:{id:user._id},
            registeredClaims:{expiresIn:process.env.REFRESH_TOKEN_EXPIRATION_TIME,jwtid:uuid4()},
            secretKey:process.env.JWT_SECRET_REFRESH
        })
        res.status(200).json({message:"Done",accessToken,refreshToken})
    } catch (error) {
        console.log(error);
        
    }
}





export const emailSignInService=async(req,rees)=>{
        



    const {idToken}=req.body
    
    const client = new OAuth2Client();
   const ticket = await client.verifyIdToken({
    idToken,
    audience:CLIENT_ID, 
  });
  const payload = ticket.getPayload();
     
}