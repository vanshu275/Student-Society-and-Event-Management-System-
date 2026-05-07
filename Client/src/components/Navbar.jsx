import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatar =
    user?.gender === "Female"
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=John";

  const navLinks = [
    { name: "Home", path: "/explore" },
    { name: "Events", path: "/explore/events" },
    { name: "Societies", path: "/explore/societies" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-5 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      {/* --- LOGO --- */}
      <div
        onClick={() => navigate("/explore")}
        className="cursor-pointer flex flex-col leading-none group"
      >
        <span className="font-black text-2xl tracking-tighter text-white uppercase group-hover:text-blue-500 transition-colors">
          College<span className="text-blue-600">.</span>Connect
        </span>
        <span className="uppercase text-[10px] font-black tracking-[0.4em] text-gray-500 mt-1">
          GBPUAT Portal
        </span>
      </div>

      {/* --- CENTER LINKS --- */}
      <div className="hidden md:flex gap-12 items-center">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
              {/* Animated Underline */}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          );
        })}
      </div>

      {/* --- RIGHT SECTION (Auth) --- */}
      <div className="flex items-center gap-6">
        {user ? (
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all cursor-pointer group"
          >
            <div className="relative">
              <img
                src={avatar}
                alt="user"
                className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 group-hover:scale-110 transition-transform"
              />
              {/* Online Status Dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full shadow-sm"></span>
            </div>
            <span className="font-black text-xs uppercase tracking-widest text-gray-200">
              {user.name.split(" ")[0]}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] active:scale-95"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};