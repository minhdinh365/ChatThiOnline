import express from "express";
import { createChat, getChatOfBox } from "../controller/ChatThiOnline.js";

const router = express.Router();

router.route("/:box").get(getChatOfBox);
router.route("/").post(createChat);

export default router;
