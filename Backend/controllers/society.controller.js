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