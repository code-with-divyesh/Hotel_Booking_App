import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";

const app = express();
app.use(cors());

// Clerk webhook route (raw body required)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);

// All other routes
app.use(express.json());
app.use(clerkMiddleware());

// Root route
app.get("/", async (req, res) => {
  try {
    await connectDB(); // serverless me har request par ensure karo DB connect ho
    res.send("✅ API is Working with Vercel + MongoDB");
  } catch (err) {
    res.status(500).send("❌ DB connection failed: " + err.message);
  }
});

// 👇 ye line important hai serverless ke liye
export default app;
