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

    // ⚠️ Make sure req.body is raw (see Express config note below)
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created": {
        await User.create(userData);
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
        console.log("Unhandled webhook type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;

/*

Bahut sahi sawaal 🔥 — mai ab **high level explanation** dunga, matlab *kyu kiya* vo samjhaata hoon (na ki *kaise kiya*).

---

## ⚡ Problem

Tere app me **users Clerk pe register/login karte hain**.
Clerk ka kaam hai authentication (login, signup, sessions handle karna).

👉 Lekin Clerk ka **user database** aur **tera MongoDB ka database** alag hai.
Tujhe apne app me users ki info chahiye (naam, email, image, role, etc.) taaki:

* Tu unka data show kar sake (profile, bookings, etc.).
* Apne database me unka record rakh sake (relations with hotels, bookings, reviews, etc.).

Isliye Clerk ke saath **sync karna padta hai**.

---

## ⚡ Solution: Webhooks

Clerk ke paas ek system hai — **Webhooks**.
Matlab: Jab bhi Clerk pe user ke saath koi event hota hai (create, update, delete), vo ek **HTTP request** bhejta hai tere server ko.

Example:

* User naya ban gaya → `"user.created"` webhook bhejega.
* User ka naam update hua → `"user.updated"` bhejega.
* User delete hua → `"user.deleted"` bhejega.

---

## ⚡ Hamne Code Me Kya Kiya

1. **Verify request (Security)**

   * Humne `svix.Webhook` ka use kiya signature verify karne ke liye.
   * Matlab: ensure karna ki request **Clerk se hi aayi hai**, koi hacker ne fake request nahi bheji.

2. **Extract user data**

   * Clerk ke `req.body` se user ki info nikali (id, email, name, image).
   * Usko MongoDB format me convert kiya (`userData`).

3. **Sync with MongoDB**

   * Agar user **ban gaya** Clerk pe → DB me `User.create`.
   * Agar user **update hua** Clerk pe → DB me bhi update.
   * Agar user **delete hua** Clerk pe → DB se bhi delete.

4. **Respond back**

   * Clerk expect karta hai ki server bole: `"haan maine webhook receive kar liya"`.
   * Agar 200 status nahi bheja, Clerk fir se try karega.

---

## ⚡ Short Summary

Ye sab isliye kiya gaya hai:
✅ Taaki **Clerk aur MongoDB me user ka data sync rahe**.
✅ Jab bhi Clerk pe user change ho, wo change tere app ke DB me bhi reflect ho.
✅ Security ke liye request verify ki, warna koi bhi fake webhook bhej kar users modify kar sakta tha.

---

💡 Ek line me:
**Clerk = Auth system**
**MongoDB = App data system**
→ Webhook bridge banaya taaki dono ek hi user info rakhe.

---

   [ User Signs up / Updates Profile / Deletes Account ]
                               │
                               ▼
                        [ Clerk Servers ]
                               │
                               │  (Sends webhook event via HTTP POST)
                               ▼
             ┌───────────────────────────────┐
             │   Your Express API (Backend)  │
             └───────────────────────────────┘
                               │
                1. Verify webhook signature 
                   using svix (security check)
                               │
                               ▼
                2. Extract user data (id, email,
                   name, image, etc.)
                               │
                               ▼
                3. Switch on event type:
                   ┌───────────────────────────────┐
                   │  "user.created" → Insert new  │
                   │  "user.updated" → Update data │
                   │  "user.deleted" → Remove user │
                   └───────────────────────────────┘
                               │
                               ▼
             ┌───────────────────────────────┐
             │      MongoDB (Your DB)        │
             │   Users collection updated    │
             └───────────────────────────────┘
                               │
                               ▼
                  Send response { success: true }
                               │
                               ▼
                        [ Clerk Servers ]
                 Marks webhook as "delivered"


*/
