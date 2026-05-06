import API from "./index";

// 📅 Get all events
export const fetchEvents = () =>
  API.get("/events");

// ✅ Register for event
export const registerEvent = (id) =>
  API.post(`/events/register/${id}`);

// ➕ Create event (admin / society_head)
export const createEvent = (eventData) =>
  API.post("/events/create", eventData);

// 👥 Get participants (admin only)
export const getEventParticipants = (id) =>
  API.get(`/events/${id}/participants`);