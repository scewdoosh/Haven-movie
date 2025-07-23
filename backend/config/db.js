import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected to mongodb")
    }catch(error){
        console.error(`error connecting forn config/db.js ${error.message}`)
        process.exit(1);
    }
}
export default connectDB