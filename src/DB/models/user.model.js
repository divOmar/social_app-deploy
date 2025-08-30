




import mongoose from 'mongoose';

import { providerEnum } from '../../constants/constants.js';
import { systemRolles } from '../../constants/constants.js';
import { genderEnum } from '../../constants/constants.js';
import { dencryption, encryption } from '../../utils/encryption.utils.js';
import { hashSync } from 'bcrypt';
 


const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:[true,"user name is already taken"],
        lowercase:true,
        trim:true,
        minlength:[3,"user name must be at least 3 chars"],
        maxlength:[20,"user name must be at least 3 chars"],
    },
    email:{
         type:String,
        require:true,
        unique:[true,"email is already taken"],
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
        min:[18,"user must be at least 18 years old"]
    },
    profilePecture:{
        secure_url:String,
        public_id:String
    },
    coverPicture:[{
        secure_url:String,
        public_id:String
    }],
    confirmOtp:String,
    forgetOtp:String,
    isDeactiveated:{
         type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    gender:{
        type:String,
        default:"dont prefer to tell",
        ENUM:Object.values(genderEnum)
    }
    ,
    DOB:Date,
    role:{
        type:String,
        default:systemRolles.user,
        ENUM:Object.values(systemRolles)
    },
    provider:{
        type:String,
        default:providerEnum.System,
        ENUM:Object.values(providerEnum)
    }
},{timestamps:true})

userSchema.pre("save", async function () {
    const changes = this.getChanges?.()?.$set || {};
    if (changes.password) {
    this.password = hashSync(this.password, +process.env.SALT);
    }
    if (changes.phone) {
    this.phone = await encryption({
    value: this.phone,
    secertKey: process.env.ENCRYPTED_KEY,
    });
    }
    console.log("After processing changes:", this);
});


// userSchema.post("findOne",async function(doc){
//     // console.log(this.getQuery());
//     // console.log(doc);
//     doc.phone=await dencryption({cipher:doc.phone,secertKey: process.env.ENCRYPTED_KEY})
// })

export const User =mongoose.models.user||mongoose.model("User",userSchema)
