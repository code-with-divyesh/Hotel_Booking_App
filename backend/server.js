import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controller/ClearkWebHooks.js";

const app = express();
app.use(cors());

// Clerk webhook (raw body required)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);

// Baaki sab ke liye JSON parser
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", async (req, res) => {
  try {
    await connectDB(); // lazy connect for Vercel
    res.send("✅ API is Working with MongoDB");
  } catch (err) {
    res.status(500).send("❌ DB connection failed: " + err.message);
  }
});

// ⚡ Local dev ke liye listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  });
}

// ⚡ Vercel ke liye export
export default app;
