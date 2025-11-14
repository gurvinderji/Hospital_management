import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/message.controller.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.post("/send-message", sendMessage);
messageRouter.post("/getall", isAdminAuthenticated, getAllMessages);

export default messageRouter;
