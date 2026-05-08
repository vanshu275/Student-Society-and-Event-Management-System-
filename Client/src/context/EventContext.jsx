import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchEvents,
  registerEvent,
} from "../api/events.js";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH EVENTS
  const getEvents = async () => {
    try {
      setLoading(true);

      const { data } = await fetchEvents();

      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // REGISTER EVENT
  const handleRegister = async (id) => {
    try {
      const { data } = await registerEvent(id);

      alert(data.message);

      getEvents();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        handleRegister,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);