import API from "./index";

// 🏫 Get all societies
export const fetchSocieties = () =>
  API.get("/societies");

// ❤️ Follow / Unfollow
export const followSociety = (id) =>
  API.patch(`/societies/follow/${id}`);

// ➕ Create society (admin only)
export const createSociety = (data) =>
  API.post("/societies/create", data);