import Slide from "../models/slide.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get all slides
export const getSlides = async (req, res) => {
  try {
    const slides = await Slide.find(); // Fetch all slides from the database
    res.status(200).json(slides); // Send slides as JSON response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch slides", error }); // Handle errors
  }
};

export const createSlide = async (req, res) => {
  try {
    // Check if an image and alt text are provided
    if (!req.files || !req.files.image || !req.body.alt) {
      return res.status(400).json({ message: "Image and alt text are required." });
    }

    const image = req.files.image;
    const { alt } = req.body;

    // Check if a file is uploaded
    if (!image || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Check file format
    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({ error: "Invalid file format. Only PNG and JPEG are allowed" });
    }

    // Check file type (extra safety)
    if (!image.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }

    // Check file size (max 100MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (image.size > maxSize) {
      return res.status(400).json({ message: "File size exceeds 5MB limit." });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "slides",
    });

    // Create a new slide with the Cloudinary URL
    const newSlide = new Slide({
      image: result.secure_url, // Cloudinary URL
      alt,
    });

    await newSlide.save();
    console.log("New Slide Saved:", newSlide);

    res.status(201).json(newSlide);
  } catch (error) {
    console.error("Error creating slide:", error);
    res.status(400).json({ message: "Failed to create slide", error });
  }
};


// Let me know if you want any adjustments or more features added! 🚀


// Delete a slide
export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params; // Extract slide ID from request parameters
    const deletedSlide = await Slide.findByIdAndDelete(id); // Delete slide
    if (!deletedSlide) {
      return res.status(404).json({ message: "Slide not found" }); // Handle slide not found
    }
    res.status(200).json({ message: "Slide deleted successfully" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Failed to delete slide", error }); // Handle errors
  }
};