const Society = () => {
  return (
    <section className="py-40 bg-white text-black societies-container rounded-[4rem] mx-4 overflow-visible relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="reveal-header text-center mb-24">
          <h2 className="text-sm font-black text-blue-600 tracking-[0.5em] uppercase mb-6 italic">
            The Ecosystem
          </h2>

          <h3 className="text-6xl md:text-9xl font-[1000] tracking-tighter leading-none">
            ELITE <br /> SOCIETIES.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["CORSIT", "EDC", "ACUMEN", "LIT-SOC"].map((soc, i) => (
            <div
              key={i}
              className="society-card min-h-[320px] border-2 border-black/5 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-black hover:text-white transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-6 group-hover:bg-white/10 flex items-center justify-center font-black text-xl text-black group-hover:text-white">
                {soc[0]}
              </div>

              <h5 className="text-2xl font-black mb-2">
                {soc}
              </h5>

              <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-40">
                View Profile
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Society;