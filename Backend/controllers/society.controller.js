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
        const { name, description, level, societyHeadEmail } = req.body;

        const existingSociety = await Society.findOne({ name });

        if (existingSociety) {
            return res.status(400).json({
                message: "Society already exists"
            });
        }

        // Find user
        const headUser = await User.findOne({
            email: societyHeadEmail
        });

        if (!headUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Make society
        const newSociety = new Society({
            name,
            description,
            level,
            admin: headUser._id,
        });

        await newSociety.save();

        // Update role
        headUser.role = "society_head";
        await headUser.save();

        res.status(201).json({
            message: "Society created successfully",
            society: newSociety
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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