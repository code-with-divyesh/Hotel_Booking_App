import express from "express";
import upload from "../Middleware/uploadMiddleware.js";
import { protect } from "../Middleware/authMiddleware.js";
import { createRoom } from "../Controller/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);

export default roomRouter;
