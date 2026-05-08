// controllers/admin.controller.js

import { User } from "../models/User.model.js";

export const makeSocietyHead = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        /* ALREADY SOCIETY HEAD */
        if (user.role === "society_head") {
            return res.status(400).json({
                message: "User is already a society head"
            });
        }

        /* ADMIN CANNOT BE CHANGED */
        if (user.role === "admin") {
            return res.status(400).json({
                message: "Admin role cannot be changed"
            });
        }

        user.role = "society_head";

        await user.save();

        res.status(200).json({
            message: "User promoted to society head successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};