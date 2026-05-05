import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    category: { type: String, required: true },
    organizingSociety: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
    registrationFee: { type: Number, default: 0 },
    participants: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        registeredAt: { type: Date, default: Date.now }
    }],
    bannerImage: { type: String }
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);
