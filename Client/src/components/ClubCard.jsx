
export const ClubCard = ({ name, icon, isTextIcon }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100 hover:border-blue-200 transition group">
    <div className="flex items-center gap-3">
      <div
        className={`w-11 h-11 ${isTextIcon ? "bg-[#002d62] text-white" : "bg-gray-100"} rounded-xl flex items-center justify-center text-sm font-bold text-center leading-none overflow-hidden`}
      >
        {icon}
      </div>
      <p className="text-xs font-black text-gray-700">{name}</p>
    </div>
    <button className="bg-[#1a4b9c] group-hover:bg-blue-700 text-white text-[9px] px-5 py-1.5 rounded-full uppercase font-black transition">
      Join
    </button>
  </div>
);
