

export const StatCard = ({ label, sub, color, icon }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 w-64 border border-gray-100 hover:shadow-md transition cursor-pointer">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <p className={`text-[9px] font-black tracking-tighter ${color}`}>{sub}</p>
      <p className="font-bold text-gray-800 text-sm">{label}</p>
    </div>
  </div>
);
