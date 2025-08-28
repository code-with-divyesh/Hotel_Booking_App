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

app.get("/", (req, res) => {
  res.send("API is Working ✅");
});

// ⚡ Vercel fix: remove app.listen
connectDB();

// ✅ Instead of app.listen, export the handler
export default app;
