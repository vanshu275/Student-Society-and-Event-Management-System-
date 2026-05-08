import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    college: "College of Technology",
    branch: "",
    id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signUp(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate("/explore");
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-[420px] space-y-4 border"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account 🎓
        </h2>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="input"
        />

        {/* College ID */}
        <input
          name="id"
          type="number"
          placeholder="College Unique ID"
          onChange={handleChange}
          required
          className="input"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="input"
        />

        {/* Gender */}
        <select name="gender" onChange={handleChange} className="input">
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* College */}
        <select name="college" onChange={handleChange} className="input">
          <option>College of Technology</option>
          <option>College of Agriculture</option>
          <option>College of Basic Sciences & Humanities</option>
          <option>College of Veterinary & Animal Sciences</option>
          <option>College of Home Science</option>
          <option>College of Fisheries</option>
          <option>College of Agribusiness Management</option>
        </select>

        {/* Branch */}
        <input
          name="branch"
          placeholder="Branch (e.g. CSE)"
          onChange={handleChange}
          className="input"
        />

        <button className="btn-primary">
          Register 🚀
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;