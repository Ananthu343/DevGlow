import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import Database from "./repositories/mainRepository.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"


dotenv.config()
const app = express()


const connectionString = process.env.CONNECTION_STRING
const db = new Database(connectionString)
db.connect()

app.use(
    cors({
      origin: "http://localhost:3000", // replace with your client's origin
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  );

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRoutes)


const port = process.env.SERVER_PORT

try {
    app.listen(port,()=>{
        console.log(`server running on ${port}`);
    })
} catch (error) {
    console.log(error);
}