import { User } from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { name, email, password, gender , college, id, branch } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            college,
            id,
            branch
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            token,
            user: { id: newUser._id, name: newUser.name, id : newUser.id , role: newUser.role, college: newUser.college , gender : newUser.gender ,  id : newUser.id , branch : newUser.branch }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { id, password } = req.body;

        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name , role: user.role, college: user.college , gender : user.gender , id : user.id , branch : user.branch }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


