import { useRef } from "react";
import { useSociety } from "../context/SocietyContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Society = () => {
  const containerRef = useRef(null);

  const { societies, loading, handleFollow } = useSociety();

  const gradients = [
    "from-blue-950",
    "from-purple-950",
    "from-pink-950",
    "from-cyan-950",
    "from-orange-950",
    "from-green-950",
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray(".fact-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${societies.length * 100}%`,
        pin: true,
        scrub: 1,
        snap: 1 / (societies.length - 1),
      },
    });

    cards.forEach((card, i) => {
      if (i === 0) return;

      tl.fromTo(
        card,
        {
          y: "100%",
        },
        {
          y: "0%",
          ease: "circ.out",
        },
      );
    });

    // TEXT ANIMATION
    cards.forEach((card) => {
      const content = card.querySelector(".society-content");

      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "top top",
            scrub: 1,
          },
        },
      );
    });
  }, [societies]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white text-5xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <div className="relative z-20 bg-[#0a0a0a] main-content mb-[90vh] shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
          {/* GRADIENT BLOBS */}
          <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 blur-[180px] rounded-full top-[-15%] left-[-10%]" />

          <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full bottom-[-10%] right-[-5%]" />

         
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

         
          <div className="absolute text-[18vw] font-black text-white/5 uppercase italic select-none">
            Society
          </div>

          {/* CONTENT */}
          <div className="relative z-10 text-center mt-[20vh] px-6 max-w-6xl">
            <span className="text-cyan-400 uppercase tracking-[8px] text-sm md:text-lg font-mono">
              Student Communities
            </span>

            <h1 className="text-white text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none mt-6 mb-10">
              Explore <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                Societies
              </span>
            </h1>

            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              Discover university communities built for coders, designers,
              musicians, entrepreneurs, creators and innovators. Connect with
              passionate students, join exciting activities, collaborate on
              projects and become part of something bigger than just academics.
            </p>

         

            {/* SCROLL TEXT */}
            <div className="mt-24 animate-bounce">
              <p className="text-gray-500 tracking-[6px] text-sm uppercase">
                Scroll To Discover
              </p>
            </div>
          </div>
        </section>

        <div
          id="societies"
          ref={containerRef}
          className="relative h-screen w-full bg-black overflow-hidden"
        >
          {societies.map((society, index) => (
            <div
              key={society._id}
              className={`fact-card absolute inset-0 h-screen w-full flex items-center justify-center bg-gradient-to-b ${
                gradients[index % gradients.length]
              } to-black overflow-hidden`}
              style={{ zIndex: index }}
            >
              {/* BIG BG TEXT */}
              <div className="absolute opacity-[0.05] text-[18vw] font-black text-white bottom-[-5%] right-[-2%] select-none pointer-events-none uppercase italic">
                0{index + 1}
              </div>

              {/* GRID */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

              {/* CONTENT */}
              <div className="society-content relative z-10 px-8 max-w-6xl text-center">
                <span className="text-cyan-400 font-mono text-lg md:text-2xl tracking-[6px] uppercase">
                  Society #{index + 1}
                </span>

                <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black mt-6 mb-8 uppercase tracking-tighter italic leading-none">
                  {society.name}
                </h2>

                <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
                  {society.description}
                </p>

                {/* INFO */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-5">
                    <p className="text-gray-400 text-sm mb-1 uppercase">
                      Level
                    </p>

                    <h3 className="text-white text-2xl font-bold">
                      {society.level}
                    </h3>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-5">
                    <p className="text-gray-400 text-sm mb-1 uppercase">
                      Followers
                    </p>

                    <h3 className="text-white text-2xl font-bold">
                      {society.followers.length}
                    </h3>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => handleFollow(society._id)}
                  className="px-12 py-5 rounded-full bg-white text-black text-xl font-bold hover:scale-105 transition-all duration-300"
                >
                  Follow Society
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Society;

