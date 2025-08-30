//api to create a new room for a hotel

import Hotel from "../Models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../Models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "no hotel found" });
    }
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: "Room Created successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to get all Rooms

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to get all room for a specific hotel

export const getOwnerRooms = async (req, res) => {
  try {
    // hotel find karo jiska owner current user hai
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotelData) {
      return res.json({
        success: false,
        message: "No hotel found for this owner",
      });
    }

    // ab rooms find karo jo us hotel se belong karte hai
    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to toggle availablity of room
export const toggleRoomAvailablity = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "room availablity upadated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
