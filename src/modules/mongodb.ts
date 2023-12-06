import mongoose from "mongoose";

export async function connectDatabase(){
    try {
        await mongoose.connect('mongodb://localhost:27017/smart-wallet')
    }catch(err){
        console.log(err)
    }
}