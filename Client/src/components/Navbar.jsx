import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const avatar =
    user?.gender === "Female"
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=John";

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white/90 backdrop-blur-xl border-b border-gray-400 sticky top-0 z-50">

      {/* Logo */}
      <div
        onClick={() => navigate("/explore")}
        className="cursor-pointer flex flex-col leading-4"
      >
        <span className="font-extrabold text-2xl">College Connect</span>
        <span className="uppercase text-sm font-bold text-gray-500">
          GBPUAT
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-10 font-semibold text-gray-600">
        <Link to="/explore" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/explore/events" className="hover:text-blue-600">
          Events
        </Link>
        <Link to="/explore/societies" className="hover:text-blue-600">
          Societies
        </Link>
        <Link to="/explore/about" className="hover:text-blue-600">
          About
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {user ? (
          // ✅ LOGGED IN → PROFILE
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border hover:shadow-md cursor-pointer transition"
          >
            <img
              src={avatar}
              alt="user"
              className="w-9 h-9 rounded-full bg-blue-100"
            />
            <span className="font-semibold text-gray-700">
              {user.name}
            </span>
          </div>
        ) : (
          // ❌ NOT LOGGED IN
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};