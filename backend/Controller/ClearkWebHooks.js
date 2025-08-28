import User from "../Models/user.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = whook.verify(payload, headers);
    const { data, type } = evt;

    console.log("✅ Clerk Event Type:", type);
    console.log("📩 Clerk Event Data:", JSON.stringify(data, null, 2));

    // construct user data
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    // send response early
    res.status(200).json({ success: true });

    switch (type) {
      case "user.created":
        await User.findByIdAndUpdate(data.id, userData, { upsert: true });
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: true,
        });
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        console.log("⚠️ Unhandled webhook type:", type);
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
