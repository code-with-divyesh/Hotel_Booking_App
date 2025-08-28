import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";

const app = express();
app.use(cors());

// ✅ Clerk webhook (raw body) pehle
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);

// ✅ Baaki sab ke liye json body parser
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Root route
app.get("/", async (req, res) => {
  try {
    await connectDB(); // lazy connect
    res.send("API is Working ✅ with MongoDB");
  } catch (err) {
    res.status(500).send("DB connection failed ❌: " + err.message);
  }
});

// ⚡ Vercel me app.listen nahi, sirf export
export default app;
