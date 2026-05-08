import { ArrowRight } from "lucide-react";
import { useEvent } from "../../context/EventContext";

const Event = () => {
  const { events, loading, handleRegister } = useEvent();

  if (loading) {
    return (
      <section className="py-32 text-center text-white">
        <h2 className="text-5xl font-black">Loading Events...</h2>
      </section>
    );
  }

  return (
    <section className="events-section-trigger py-20 px-6 max-w-7xl mx-auto text-white">
      <div className="reveal-header mb-20">
        <h2 className="text-sm font-black text-blue-500 tracking-[0.5em] uppercase mb-4">
          // Major Highlights
        </h2>

        <h3 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          Famous <br /> Events.
        </h3>
      </div>

      {events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FEATURED EVENT */}
          <div className="event-card group relative aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer">
            <img
              src={
                events[0]?.banner ||
                "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070"
              }
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              alt={events[0]?.title}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-12 left-12">
              <div className="bg-blue-600 text-[10px] font-black px-4 py-1 rounded-full w-fit mb-4 uppercase">
                {events[0]?.category || "Mega Event"}
              </div>

              <h4 className="text-6xl font-black mb-4 uppercase">
                {events[0]?.title}
              </h4>

              <button
                onClick={() => handleRegister(events[0]._id)}
                className="flex items-center gap-3 font-black text-sm group-hover:gap-5 transition-all uppercase tracking-widest"
              >
                Join Event <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* OTHER EVENTS */}
          <div className="flex flex-col gap-8">
            {events.slice(1).map((ev) => (
              <div
                key={ev._id}
                className="event-card p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group text-white"
              >
                <span className="text-blue-500 font-black text-xs tracking-widest italic">
                  {new Date(ev.date).toLocaleDateString()}
                </span>

                <h4 className="text-3xl font-black mt-4 mb-2 uppercase">
                  {ev.title}
                </h4>

                <p className="text-white/70 font-medium mb-6">
                  {ev.description}
                </p>

                <button
                  onClick={() => handleRegister(ev._id)}
                  className="flex items-center gap-3 font-black text-sm group-hover:gap-5 transition-all uppercase tracking-widest text-blue-400"
                >
                  Join Event <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Event;