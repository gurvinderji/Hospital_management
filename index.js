import dotenv from "dotenv";
dotenv.config();

import dbConnection from "./db/db.js";
dbConnection();

import express from "express";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET,
});

const app = express();
app.listen(process.env.PORT || 8080, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});

import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import appointmentRouter from "./routes/appointment.route.js";

app.use("/api/message", messageRouter);
app.use("/api", userRouter);
app.use("/api/appointment", appointmentRouter);

app.use(errorMiddleware);
