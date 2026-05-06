import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signIn(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate("/explore");
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-[380px] space-y-5 border"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {/* ID */}
        <input
          type="number"
          name="id"
          placeholder="College ID"
          onChange={handleChange}
          required
          className="input"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="input"
        />

        <button className="btn-primary">
          Login 🔐
        </button>

        <p className="text-center text-sm">
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;