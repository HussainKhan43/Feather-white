// routes/adminRoutes.js
import express from 'express';
import { loginAdmin, verifyToken } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Example protected route
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin panel' });
});

export default router;
