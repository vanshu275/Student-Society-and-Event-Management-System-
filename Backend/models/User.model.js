// models/User.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender : {
        type : String ,
        required : true ,
        enum : [
            'Male' ,
            'Female'
        ]
    },
    college: {
        type: String,
        required: true,
        enum: [
            'College of Technology', 
            'College of Agriculture', 
            'College of Basic Sciences & Humanities', 
            'College of Veterinary & Animal Sciences', 
            'College of Home Science', 
            'College of Fisheries', 
            'College of Agribusiness Management'
        ]
    },

    branch: {
        type: String,
        trim: true,
        default: "N/A" 
    },
    

    id: { type: String, unique: true, sparse: true },
    
    role: {
        type: String,
        enum: ['student', 'society_head', 'admin'],
        default: 'student'
    },

    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    followedSocieties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Society' }]

}, { timestamps: true });

export const User = mongoose.model('User', userSchema);