import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const imgRef = useRef(null);
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(1);

  // Background Carousel Only
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev < 5 ? prev + 1 : 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#0a0a0a] z-10" />

        <img
          ref={imgRef}
          key={imgIndex}
          src={`img/img${imgIndex}.jpg`}
          className="hero-image w-full h-full object-cover brightness-50 scale-105"
          alt="Campus"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 text-center px-4">
        {/* BADGE */}
        <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
          <Sparkles size={14} className="text-blue-400" />

          <span className="text-[10px] font-black tracking-[0.4em] uppercase">
            The Pulse of GBPUAT
          </span>
        </div>

        {/* TITLE */}
        <h1 className="hero-title text-6xl sm:text-7xl md:text-[160px] font-black leading-[0.8] tracking-tighter mb-10 italic">
          LIMITLESS
          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white not-italic">
            ENERGY
          </span>
        </h1>

        {/* BUTTONS */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate("/explore/events")}
            className="group px-10 py-5 bg-blue-500 hover:bg-white hover:text-black text-white rounded-full font-black text-xs uppercase transition-all duration-500 flex items-center gap-3"
          >
            Explore Events

            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>

          <button
            onClick={() => navigate("/explore/societies")}
            className="px-10 py-5 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full font-black text-xs uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Join Societies
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;