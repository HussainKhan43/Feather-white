import { User } from "../models/user.model.js";

export const contact = async (req, res) => {
  try {
    const { email, name, phone, address, message } = req.body;

    if (!email || !name || !phone || !address || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Create new user instance
    const newUser = new User({ 
      email: email.trim(), 
      name: name.trim(), 
      phone: phone.trim(), 
      address: address.trim(), 
      message: message.trim()
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        message: newUser.message,
        createdOn: newUser.createdAt.toLocaleString(),
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
