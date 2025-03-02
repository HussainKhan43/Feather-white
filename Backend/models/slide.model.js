// models/slide.model.js

import mongoose from 'mongoose'; // Import mongoose

const slideSchema = new mongoose.Schema({ // Define schema
  image: {
    type: String, // Image URL (string)
    required: true, // Required field
  },
  alt: {
    type: String, // Alt text for accessibility
    required: true, // Required field
  },
});

const Slide = mongoose.model('Slide', slideSchema); // Create model

export default Slide; // Export the model
