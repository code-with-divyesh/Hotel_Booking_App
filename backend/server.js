import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";
import userRouter from "./Routes/userRoute.js";
import { protect } from "./Middleware/authMiddleware.js";
import hotelRouter from "./Routes/hotelRoute.js";
import connectCloudinary from "./Config/cloudinary.js";
import roomRouter from "./Routes/roomRouter.js";
import bookingRouter from "./Routes/bookingRouter.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors());

// Clerk middleware sabse pehle
app.use(clerkMiddleware());

// JSON parser (webhook ke alawa sab ke liye)
app.use((req, res, next) => {
  if (req.originalUrl === "/api/clerk") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Webhook route (raw body required)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);
app.use("/api/user", protect, userRouter);
app.use("api/hotels", hotelRouter);
app.use("api/rooms", roomRouter);
app.use("api/bookings",bookingRouter);
app.get("/", (req, res) => {
  res.send("API is Working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
