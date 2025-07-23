// packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";


//files
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from './routes/moviesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';



//configurations
dotenv.config()
connectDB();
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

//routes

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genre', genreRoutes)
app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/upload', uploadRoutes)

const __dirname = path.resolve();  // ✅ double-underscore
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})