// models/Society.model.js
import mongoose from 'mongoose';

const societySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    logo: { type: String }, // Cloudinary URL storage ke liye
    college: { 
        type: String, 
        default: "University Wide" // Kuch societies sirf COT ki hoti hain, kuch pure GBPUAT ki
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    socialLinks: {
        instagram: String,
        linkedin: String,
        website: String
    }
}, { timestamps: true });

export const Society = mongoose.model('Society', societySchema);