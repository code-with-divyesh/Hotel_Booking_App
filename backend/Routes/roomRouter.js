import express from "express";
import upload from "../Middleware/uploadMiddleware.js";
import { protect } from "../Middleware/authMiddleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailablity,
} from "../Controller/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailablity);

export default roomRouter;
