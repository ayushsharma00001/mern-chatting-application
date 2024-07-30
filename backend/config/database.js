import mongoose from "mongoose";
const connectDb =async ()=>{
   await mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB is connected");
   }).catch((err)=>{
    console.log(err);
   })
}

export default connectDb;