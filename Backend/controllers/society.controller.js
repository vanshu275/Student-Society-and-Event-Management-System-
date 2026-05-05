import { Society } from '../models/Society.model.js';
import { User } from '../models/User.model.js';

export const followSociety = async (req, res) => {
    try {
        const { societyId } = req.params;
        const userId = req.user.id;

        const society = await Society.findById(societyId);
        if (!society) return res.status(404).json({ message: "Society not found" });

        // Check if already following
        const isFollowing = society.followers.includes(userId);

        if (isFollowing) {
            // Unfollow logic
            await Society.findByIdAndUpdate(societyId, { $pull: { followers: userId } });
            await User.findByIdAndUpdate(userId, { $pull: { followedSocieties: societyId } });
            return res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            // Follow logic
            await Society.findByIdAndUpdate(societyId, { $push: { followers: userId } });
            await User.findByIdAndUpdate(userId, { $push: { followedSocieties: societyId } });
            return res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// CREATE SOCIETY (Only for Admin - University Level)
export const createSociety = async (req, res) => {
    try {
        const { name, description, level, societyHeadEmail } = req.body; // Isme email add karo

        // 1. Check karo ki society pehle se toh nahi hai
        const existingSociety = await Society.findOne({ name });
        if (existingSociety) return res.status(400).json({ message: "Society already exists" });

        // 2. Society Head ko dhundo (Uska registered hona zaroori hai)
        const headUser = await User.findOne({ email: societyHeadEmail });
        if (!headUser) return res.status(404).json({ message: "User not found to be assigned as Head" });

        // 3. Nayi Society banao
        const newSociety = new Society({
            name,
            description,
            level,
            admin: req.user.id, // Kis admin ne banayi
        });

        await newSociety.save();

        // 4. Us user ka role update karke 'society_head' kar do
        headUser.role = 'society_head';
        await headUser.save();

        res.status(201).json({ message: "Society created successfully!", society: newSociety });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET ALL SOCIETIES (Taaki student list dekh sake)
export const getAllSocieties = async (req, res) => {
    try {
        const societies = await Society.find().select('name description followers category');
        res.status(200).json(societies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};