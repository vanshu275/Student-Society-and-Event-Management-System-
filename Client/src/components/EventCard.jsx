
export const EventCard = ({ title, date, loc, img, stars }) => (
  <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
    <div className="relative overflow-hidden h-44">
      <img
        src={img}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        alt={title}
      />
    </div>
    <div className="p-5">
      <h3 className="font-black text-sm text-gray-800 leading-tight">
        {title}
      </h3>
      <div className="mt-2 space-y-1">
        <p className="text-[11px] text-gray-500 flex items-center gap-1 font-semibold">
          📅 {date}
        </p>
        <p className="text-[11px] text-gray-500 flex items-center gap-1 font-semibold">
          📍 {loc}{" "}
          {stars && <span className="text-yellow-400 ml-1">★★★★★</span>}
        </p>
      </div>
      <button className="w-full mt-5 bg-[#1a4b9c] hover:bg-blue-900 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition">
        Register
      </button>
    </div>
  </div>
);