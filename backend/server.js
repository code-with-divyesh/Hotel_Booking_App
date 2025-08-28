import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";

const app = express();
app.use(cors());

// Clerk webhook (⚡ keep raw body here)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);

// All other routes (JSON parser applied after webhook)
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("✅ API is Working");
});

const PORT = process.env.PORT || 3000;

// Start server only after DB connect
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
