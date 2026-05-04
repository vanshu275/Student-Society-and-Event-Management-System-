export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <span className="flex flex-col leading-4 schoolbell">
          <span className=" font-extrabold  text-2xl ">College Connect</span>
          <span className=" uppercase text-[20px] font-bold ">gbpuat</span>
        </span>
      </div>

      {/* Links */}

      <div className="hidden md:flex gap-10 font-bold text-gray-500 text-[16px] roboto ">
        <a href="#" className=" hover:text-blue-600 transition-all ">
          Home
        </a>
        <a href="#" className="hover:text-blue-600 transition-all">
          Events
        </a>
        <a href="#" className="hover:text-blue-600 transition-all">
          Societies
        </a>
        <a href="#" className="hover:text-blue-600 transition-all">
          Clubs
        </a>
        <a href="#" className="hover:text-blue-600 transition-all">
          About
        </a>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer hover:scale-110 transition-transform">
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-2 rounded-full border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            className="w-9 h-9 rounded-full border-2 border-white bg-blue-100 shadow-sm"
            alt="User"
          />
          <span className="text-[16px] font-bold text-gray-700 ">Vansh</span>
        </div>
      </div>
    </nav>
  );
};
