import Hotel from "../Models/Hotel.js";
import User from "../Models/user.js";
const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    //check hotel already Register
    const hotel = await Hotel.findOne(owner);
    if (hotel) {
      return res.json({ success: false, message: "hotel already Register" });
    } else {
      await Hotel.create({ name, address, contact, city, owner });
      await User.findOneAndUpdate(owner, { role: "hotelOwner" });
      res.json({ success: true, message: "hotel Register successfully" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default registerHotel;