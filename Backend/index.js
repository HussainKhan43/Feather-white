import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import slideRoute from "./routes/slide.route.js";
import adminRoutes from './routes/admin.route.js';
import fileUpload from "express-fileupload";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGO_URI;

// Enable CORS for all routes
const allowedOrigins = ['https://feather-white.vercel.app'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // enable credentials
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
};

app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 },//5MB
    abortOnLimit: true,
  })
);

// MongoDB connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    bufferCommands: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Define routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use('/api/slides', slideRoute);
app.use('/api/admin', adminRoutes);


// Cloudinary Configuration Code
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
