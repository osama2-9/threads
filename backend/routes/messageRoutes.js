import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getMessages,
  sendMessage,
  getConversations,
  CreateConversation,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.post("/create/:recipientId", protectRoute, CreateConversation);
router.get("/:otherUserId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage);

export default router;
