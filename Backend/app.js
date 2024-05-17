import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "./repositories/mainRepository.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import http from 'http';
import { Server } from "socket.io";
import { socketManage } from "./controllers/userControllers/socketManage.js";

dotenv.config();
const app = express();

const connectionString = process.env.CONNECTION_STRING;
const clientPath = process.env.CLIENT_BASE_PATH;
const db = new Database(connectionString);
db.connect();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/users", userRoutes);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", ""],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

socketManage(io);

const port = process.env.SERVER_PORT || 3001;

httpServer.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
