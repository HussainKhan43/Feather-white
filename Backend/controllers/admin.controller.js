// controllers/adminController.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginAdmin = (req, res) => {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const { username, password } = req.body;

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.admin = decoded;
        next();
    });
};

// Let me know if you want me to help set up the routes or improve anything else! 🚀
