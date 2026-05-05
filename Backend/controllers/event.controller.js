import { Event } from '../models/Event.model.js';
import { User } from '../models/User.model.js';

// 1. CREATE EVENT (Only for Society Heads/Admins)
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, venue, category, registrationFee, societyId } = req.body;

        const society = await Society.findById(societyId);
        if (!society) return res.status(404).json({ message: "Society not found" });

        if (society.admin.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                message: "Aap is society ke liye event nahi bana sakte, aap owner nahi ho!" 
            });
        }
        const newEvent = new Event({
            title, description, date, venue, category, registrationFee,
            organizingSociety: societyId,
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. GET ALL EVENTS (Discovery Page)
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizingSociety', 'name logo');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. ONE-CLICK REGISTRATION
export const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id; 

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const alreadyRegistered = event.participants.some(p => p.user.toString() === userId);
        if (alreadyRegistered) return res.status(400).json({ message: "Already registered" });

        // Simple registration: sirf user ID push ho rahi hai
        event.participants.push({ user: userId });
        await event.save();

        await User.findByIdAndUpdate(userId, {
            $push: { registeredEvents: eventId }
        });

        res.status(200).json({ message: "Registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getEventParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId).populate({
            path: 'participants.user',
            select: 'name email rollNumber branch college' 
        });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({
            eventTitle: event.title,
            totalParticipants: event.participants.length,
            participantList: event.participants
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};