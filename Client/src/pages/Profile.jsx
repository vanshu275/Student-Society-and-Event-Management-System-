import { useEffect } from "react"; // 👈 Added useEffect
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../api/auth"; // 👈 Make sure path is correct

import {
  FiLogOut,
  FiMail,
  FiMapPin,
  FiBookOpen,
  FiShield,
  FiAward,
  FiActivity,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

import { HiSparkles, HiMiniBolt, HiMiniCheckBadge } from "react-icons/hi2";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  // 🔄 Fetch latest data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getMe();
        setUser(data); // Syncing context with DB data
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Agar token expire ho gaya ho toh logout karwa do
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    };
    fetchUserData();
  });

  if (!user) {
    return (
      <div className="w-screen h-screen bg-[#050816] flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/30 animate-pulse rounded-full"></div>
          <div className="w-16 h-16 border-[3px] border-cyan-400 border-t-transparent rounded-full animate-spin relative z-10"></div>
        </div>
      </div>
    );
  }

  const avatar =
    user?.gender === "Female"
      ? "https://api.dicebear.com/7.x/notionists/svg?seed=Jane"
      : "https://api.dicebear.com/7.x/adventurer/svg?seed=John";

  return (
    <div className="min-h-screen w-full bg-[#040816] text-white overflow-hidden relative">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 px-6 py-10 md:px-12 lg:px-20">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              My Profile
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </p>
          </div>

          <Link to="/explore">
            <div className="hidden md:flex items-center gap-2 px-6 py-4 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-xl">
              <FiArrowLeft className="text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Back</span>
            </div>
          </Link>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

            <div className="relative z-10 flex flex-col items-center">
              {/* AVATAR */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
                <div className="absolute -inset-[4px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-spin-slow"></div>
                <img
                  src={avatar}
                  alt="profile"
                  className="relative w-40 h-40 rounded-full object-cover border-[5px] border-[#081120] bg-[#081120]"
                />
                <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-400 rounded-full border-4 border-[#081120]"></div>
              </div>

              {/* NAME */}
              <h2 className="mt-8 text-3xl font-black text-center">
                {user.name}
              </h2>

              <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                <HiMiniCheckBadge className="text-cyan-400 text-lg" />
                <span className="uppercase tracking-[3px] text-xs font-bold text-cyan-300">
                  {user.role?.replace("_", " ")}
                </span>
              </div>

              {/* STATS - Mapping real lengths from response */}
              <div className="grid grid-cols-3 gap-3 w-full mt-8">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center">
                  <h3 className="text-2xl font-black text-cyan-400">
                    {user.registeredEvents?.length || 0}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Events</p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center">
                  <h3 className="text-2xl font-black text-purple-400">
                    {user.followedSocieties?.length || 0}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Societies</p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center">
                  <h3 className="text-2xl font-black text-pink-400">100%</h3>
                  <p className="text-xs text-slate-400 mt-1">Activity</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="w-full mt-8 flex flex-col gap-4">
                {(user.role === "admin" || user.role === "society_head") && (
                  <Link
                    to={"/admin/dashboard"}
                    className="group relative overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-all duration-500"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      Dashboard
                      <FiArrowRight className="group-hover:translate-x-1 transition-all" />
                    </span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="py-4 rounded-2xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard
                icon={<FiShield />}
                title="College ID"
                value={user.id} // College ID (63951)
                color="cyan"
              />
              <InfoCard
                icon={<FiMail />}
                title="Email Address"
                value={user.email}
                color="purple"
              />
              <InfoCard
                icon={<FiBookOpen />}
                title="Department"
                value={user.branch}
                color="pink"
              />
              <InfoCard
                icon={<FiMapPin />}
                title="Institution"
                value={user.college}
                color="orange"
              />
            </div>

            {/* AI SECTION */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-xl">
                    <HiMiniBolt />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">AI Student Insights</h2>
                    <p className="text-slate-400 text-sm">
                      Personalized academic activity analysis
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <InsightCard
                    icon={<FiAward />}
                    title="Top Skill"
                    value={
                      user.role === "society_head" ? "Leadership" : "Member"
                    }
                  />
                  <InsightCard
                    icon={<FiActivity />}
                    title="Engagement"
                    value={
                      user.registeredEvents?.length > 0
                        ? "Highly Active"
                        : "New Student"
                    }
                  />
                  <InsightCard
                    icon={<HiSparkles />}
                    title="Gender"
                    value={user.gender}
                  />
                </div>
              </div>
            </div>

            {/* ACTIVITY - Dummy labels for now as backend registeredEvents is empty */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black">Recent Activity</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Your latest campus interactions
                  </p>
                </div>
                <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                  Live
                </div>
              </div>

              <div className="space-y-5">
                {user.registeredEvents?.length > 0 ? (
                  user.registeredEvents.map((event, index) => (
                    <ActivityItem
                      key={index}
                      title={`Registered for ${event.name}`}
                      time="Recent"
                    />
                  ))
                ) : (
                  <ActivityItem
                    title="Profile creation completed"
                    time="Just now"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Sub-components remains same as your original layout */
const InfoCard = ({ icon, title, value, color }) => {
  const colors = {
    cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-300",
    purple: "from-purple-500/20 to-purple-500/5 text-purple-300",
    pink: "from-pink-500/20 to-pink-500/5 text-pink-300",
    orange: "from-orange-500/20 to-orange-500/5 text-orange-300",
  };
  return (
    <div
      className={`group rounded-[1.8rem] border border-white/10 bg-gradient-to-br ${colors[color]} p-6 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
          {icon}
        </div>
        <div className="w-24 h-24 rounded-full bg-white/5 blur-2xl"></div>
      </div>
      <div className="mt-8">
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-lg font-bold break-words">{value || "N/A"}</h3>
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition-all">
    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300 text-xl">
      {icon}
    </div>
    <p className="text-slate-400 text-sm mt-5">{title}</p>
    <h3 className="text-lg font-bold mt-1">{value}</h3>
  </div>
);

const ActivityItem = ({ title, time }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.05] transition-all">
    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"></div>
    <div className="flex-1">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-400 mt-1">{time}</p>
    </div>
  </div>
);

export default Profile;
