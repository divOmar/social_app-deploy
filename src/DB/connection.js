import mongoose from "mongoose";






export const databaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.DB_url)
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}