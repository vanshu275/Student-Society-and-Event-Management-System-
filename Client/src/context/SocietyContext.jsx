// src/context/SocietyContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchSocieties,
  followSociety,
} from "../api/societies.js";

const SocietyContext = createContext();

export const SocietyProvider = ({ children }) => {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET SOCIETIES
  const getSocieties = async () => {
    try {
      setLoading(true);

      const { data } = await fetchSocieties();

      setSocieties(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FOLLOW / UNFOLLOW
  const handleFollow = async (id) => {
    try {
      const { data } = await followSociety(id);

      alert(data.message);

      getSocieties();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getSocieties();
  }, []);

  return (
    <SocietyContext.Provider
      value={{
        societies,
        loading,
        handleFollow,
      }}
    >
      {children}
    </SocietyContext.Provider>
  );
};

export const useSociety = () => useContext(SocietyContext);