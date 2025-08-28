import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";

connectDB();

const app = express();
app.use(cors());

// Clerk requires raw body for webhooks verification
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }), // raw body only for webhook
  clerkWebHooks
);

// All other routes can use JSON parsing
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API is Working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
