// routes/slide.route.js

import express from 'express'; // Import express
import { getSlides, createSlide, deleteSlide } from '../controllers/slide.controller.js'; // Import controller functions

const router = express.Router(); // Create a router instance

// Route to get all slides
router.get('/', getSlides);

// Route to create a new slide
router.post('/create', createSlide);

// Route to delete a slide
router.delete('/:id', deleteSlide);

export default router; // Export the router
