import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import propertyRouter from "./routes/property.route.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose Connection Established"))
  .catch((error) => console.log("Mongoose Connection Failed", error));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);

// Global Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.get("/api/properties", async (req, res) => {
  const { location } = req.query;
  try {
    const properties = await Property.find({ location: new RegExp(location, "i") });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});


// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});
