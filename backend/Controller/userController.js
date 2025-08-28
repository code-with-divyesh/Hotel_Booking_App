import { use } from "react";
import User from "../Models/user.js";

export const getUserData = async (req, res) => {
  try {
    // Check if req.user exists (protect middleware ke through)
    if (!req.user) {
      console.error("getUserData: req.user is undefined");
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities || [];

    const response = { success: true, role, recentSearchedCities };

    // Print response to server console
    console.log("User Data Response:", response);

    // Send success response with 200 OK
    return res.status(200).json(response);
  } catch (error) {
    // Log full error for debugging
    console.error("Error in getUserData:", error);

    // Send meaningful error response
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = await req.user;
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);
    }
    await user.save();
    res.json({success:true,message:"city added"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};
