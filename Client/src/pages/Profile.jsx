import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const avatar =
    user?.gender === "Female"
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=John";

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">

      <div className="bg-white w-[420px] rounded-3xl shadow-xl p-6 space-y-6">

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={avatar}
            className="w-24 h-24 rounded-full bg-blue-100 shadow"
            alt="avatar"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500 capitalize">{user.role}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">College ID</span>
            <span className="font-semibold">{user.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">College</span>
            <span className="font-semibold">{user.college}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Branch</span>
            <span className="font-semibold">{user.branch || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Roll No</span>
            <span className="font-semibold">
              {user.rollNumber || "N/A"}
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">

          {/* Switch to Admin */}
          {(user.role === "admin" || user.role === "society_head") && (
            <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">
              Switch to Admin ⚡
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout 🚪
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;
