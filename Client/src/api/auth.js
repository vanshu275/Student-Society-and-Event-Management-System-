import API from "./index";

// 🔑 Login
export const signIn = (formData) =>
  API.post("/auth/login", formData);

// 📝 Register
export const signUp = (formData) =>
  API.post("/auth/register", formData);

// 👤 Get Current User (future use)
export const getMe = () =>
  API.get("/auth/me");