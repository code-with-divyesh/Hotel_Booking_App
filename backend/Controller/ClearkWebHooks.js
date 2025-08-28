import User from "../Models/user.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ⚠️ Ab req.body ek Buffer hai (raw mode)
    const payload = req.body.toString("utf8");

    // Verify webhook (security)
    const evt = await whook.verify(payload, headers);

    const { data, type } = evt;
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created": {
        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        console.log("Ignored webhook event:", type);
        return res
          .status(200)
          .json({ success: true, message: `Ignored event: ${type}` });
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
