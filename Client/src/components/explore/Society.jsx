import { useSociety } from "../../context/SocietyContext";

const Society = () => {
  const { societies, loading, handleFollow } = useSociety();

  if (loading) {
    return (
      <section className="py-40 flex items-center justify-center text-white">
        <h2 className="text-5xl font-black">Loading Societies...</h2>
      </section>
    );
  }

  return (
    <section className="py-40 bg-white text-black societies-container rounded-[4rem] mx-4 overflow-visible relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="reveal-header text-center mb-24">
          <h2 className="text-sm font-black text-blue-600 tracking-[0.5em] uppercase mb-6 italic">
            The Ecosystem
          </h2>

          <h3 className="text-6xl md:text-9xl font-[1000] tracking-tighter leading-none">
            ELITE <br /> SOCIETIES.
          </h3>
        </div>

        {/* SAME GSAP CLASSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {societies.slice(0, 4).map((society ) => (
            <div
              key={society._id}
              className="society-card min-h-[320px] border-2 border-black/5 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-black hover:text-white transition-all duration-500 group"
            >
              {/* ICON */}
              <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-6 group-hover:bg-white/10 flex items-center justify-center font-black text-xl text-black group-hover:text-white overflow-hidden">
                
                {society.logo ? (
                  <img
                    src={society.logo}
                    alt={society.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  society.name?.charAt(0)
                )}
              </div>

              {/* NAME */}
              <h5 className="text-2xl font-black mb-2 uppercase text-center">
                {society.name}
              </h5>

              {/* SAME SMALL TEXT */}
              <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6">
                {society.followers?.length || 0} Followers
              </p>

              {/* BUTTON */}
              <button
                onClick={() => handleFollow(society._id)}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] uppercase tracking-[0.3em] font-black"
              >
                Follow Society
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Society;