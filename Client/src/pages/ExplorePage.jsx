
import { Play, Users, Calendar, Search,  } from 'lucide-react';

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white p-8 font-sans">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search events, societies..." 
            className="w-full bg-[#161b33] border border-cyan-500/30 rounded-full py-2 px-10 focus:outline-none focus:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          />
        </div>
        <div className="flex gap-3">
          {['All', 'Technical', 'Cultural', 'Sports'].map((tag) => (
            <button key={tag} className="px-4 py-1 rounded-md border border-gray-700 hover:border-cyan-400 hover:text-cyan-400 transition-all text-sm">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Live Events */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <h2 className="text-2xl font-bold tracking-wider uppercase">Live Events</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LiveEventCard title="Tech Innovate 2024" viewers="2.5K" color="border-cyan-500" />
              <LiveEventCard title="Annual Cultural Fest" viewers="4.8K" color="border-pink-500" />
            </div>
          </section>

          {/* Societies Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-wider uppercase">College Societies</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              <SocietyCircle name="Coding Club" icon="💻" />
              <SocietyCircle name="Debating" icon="🎙️" />
              <SocietyCircle name="Dramatics" icon="🎭" />
              <SocietyCircle name="Music" icon="🎸" />
              <SocietyCircle name="Fine Arts" icon="🎨" />
            </div>
          </section>
        </div>

        {/* Right Column: Upcoming Events */}
        <div className="bg-[#111633] rounded-3xl p-6 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-cyan-400" /> Upcoming Schedule
          </h2>
          <div className="space-y-6">
            <UpcomingItem date="Oct 28" title="Robotics Symposium" time="14:00 - 18:00" />
            <UpcomingItem date="Oct 30" title="Photography Workshop" time="10:00 - 12:00" />
            <UpcomingItem date="Nov 02" title="AI Guest Lecture" time="11:30 - 13:00" />
          </div>
          <button className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl font-semibold hover:opacity-90 transition">
            View Full Calendar
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const LiveEventCard = ({ title, viewers, color }) => (
  <div className={`relative group overflow-hidden rounded-2xl border-l-4 ${color} bg-[#1a1f3d] p-5 hover:scale-[1.02] transition-transform cursor-pointer`}>
    <div className="flex justify-between items-start mb-4">
      <span className="bg-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">LIVE NOW</span>
      <div className="flex items-center gap-1 text-gray-400 text-xs">
        <Users size={14} /> {viewers}+
      </div>
    </div>
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <div className="flex justify-center py-4">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
        <Play fill="currentColor" size={20} />
      </div>
    </div>
    <button className="w-full mt-4 text-sm text-cyan-400 font-medium">WATCH/JOIN LIVE</button>
  </div>
);

const SocietyCircle = ({ name, icon }) => (
  <div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
    <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1e264a] to-[#111633] border border-white/10 flex items-center justify-center text-3xl mb-2 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
      {icon}
    </div>
    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{name}</span>
  </div>
);

const UpcomingItem = ({ date, title, time }) => (
  <div className="flex gap-4 items-center group cursor-pointer">
    <div className="bg-[#1e264a] p-3 rounded-lg text-center min-w-[60px]">
      <span className="block text-cyan-400 font-bold text-sm leading-none">{date.split(' ')[1]}</span>
      <span className="text-[10px] text-gray-400 uppercase">{date.split(' ')[0]}</span>
    </div>
    <div>
      <h4 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">{title}</h4>
      <p className="text-[11px] text-gray-500">{time}</p>
    </div>
  </div>
);

export default ExplorePage;