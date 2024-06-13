import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "./repositories/mainRepository.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
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
  origin: clientPath,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [clientPath, ""],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

socketManage(io);

const port = process.env.SERVER_PORT || 3001;

httpServer.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
