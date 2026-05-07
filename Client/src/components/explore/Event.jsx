import { ArrowRight } from "lucide-react";

const Event = () => {
  return (
    // Is class ko GSAP trigger ki tarah use karenge
    <section className="events-section-trigger py-20 px-6 max-w-7xl mx-auto">
      <div className="reveal-header mb-20">
        <h2 className="text-sm font-black text-blue-500 tracking-[0.5em] uppercase mb-4">
          // Major Highlights
        </h2>
        <h3 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          Famous <br /> Events.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Colosseum Card */}
        <div className="event-card group relative aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            alt="Colosseum"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12">
            <div className="bg-blue-600 text-[10px] font-black px-4 py-1 rounded-full w-fit mb-4 uppercase">
              Mega Event
            </div>
            <h4 className="text-6xl font-black mb-4 uppercase">Colosseum</h4>
            <div className="flex items-center gap-3 font-black text-sm group-hover:gap-5 transition-all uppercase tracking-widest">
              Register Now <ArrowRight size={18} />
            </div>
          </div>
        </div>

        {/* Other Events List */}
        <div className="flex flex-col gap-8">
          {[
            { t: "SPANDAN", d: "The soul of Pantnagar.", date: "NOV 12-15" },
            { t: "LIT-WEEK", d: "For the thinkers.", date: "OCT 05-08" },
            { t: "ACCES", d: "Engineering marvels.", date: "DEC 01" },
          ].map((ev, idx) => (
            <div
              key={idx}
              className="event-card p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group text-white"
            >
              <span className="text-blue-500 font-black text-xs tracking-widest italic">
                {ev.date}
              </span>
              <h4 className="text-3xl font-black mt-4 mb-2">{ev.t}</h4>
              <p className="text-white/70 font-medium">{ev.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;