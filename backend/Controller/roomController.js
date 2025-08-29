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

export const getRooms = async (req, res) => {};

//api to get all room for a specific hotel

export const getOwnerRooms = async (req, res) => {};

//api to toggle availablity of room
export const toggleRoomAvailablity = async (req, res) => {};
