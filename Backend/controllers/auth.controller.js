import { User } from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password, gender, college, id, branch } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            college,
            id, // College ID
            branch
        });

        await newUser.save();
        
        // Token mein hamesha _id (MongoDB) bhejte hain
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: { 
                _id: newUser._id, 
                collegeId: newUser.id, 
                name: newUser.name, 
                role: newUser.role,
                college: newUser.college,
                gender: newUser.gender,
                branch: newUser.branch 
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { id, password } = req.body; // 'id' here is College ID from frontend

        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // CRITICAL FIX: explicit payload mapping
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            token,
            user: { 
                _id: user._id, 
                collegeId: user.id, 
                name: user.name, 
                role: user.role,
                college: user.college,
                gender: user.gender,
                branch: user.branch 
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        // req.user protect middleware se aa raha hai
        if (!req.user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};