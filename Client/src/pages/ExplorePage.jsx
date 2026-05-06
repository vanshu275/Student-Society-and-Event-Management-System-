import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, Users, Zap , ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ExplorePage = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  const imgRef = useRef(null);
  const [imgIndex, setImgIndex] = useState(1);


  // Background Carousel
  useGSAP(() => {
    const interval = setInterval(() => {
      gsap.to(imgRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          setImgIndex((prev) => (prev < 5 ? prev + 1 : 1));
          gsap.to(imgRef.current, { opacity: 1, duration: 1 });
        },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, { scope: container });

  // GSAP ScrollTrigger Animations
  useGSAP(() => {
    // 1. Footer Reveal
    gsap.set(".reveal-footer", { yPercent: -20 });
    ScrollTrigger.create({
      trigger: ".main-content",
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(".reveal-footer", { yPercent: 0, ease: "none" }),
    });

    // 2. Section Headers Reveal
    const headers = document.querySelectorAll(".reveal-header");
    headers.forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // 3. Staggered Event Cards
    gsap.from(".event-card", {
      scrollTrigger: {
        trigger: ".events-grid",
        start: "top 75%",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "expo.out",
    });

    // 4. Society Cards Pop-in
    gsap.from(".society-card", {
      scrollTrigger: {
        trigger: ".societies-container",
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white">
      {/* --- MAIN WRAPPER --- */}
      <div className="relative z-20 bg-[#0a0a0a] main-content mb-[90vh] shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        
        {/* HERO */}
        <header className="relative h-[100vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a] z-10" />
            <img ref={imgRef} src={`img/img${imgIndex}.jpg`} className="w-full h-full object-cover scale-105 brightness-50 contrast-125" alt="Campus" />
          </div>
          <div className="relative z-20 text-center px-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">The Pulse of GBPUAT</span>
            </div>
            <h1 className="text-7xl md:text-[160px] font-black leading-[0.75] tracking-tighter mb-12 italic">
              LIMITLESS <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white not-italic">ENERGY</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button onClick={() => navigate("/explore/events")} className="group px-12 py-6 bg-blue-600 hover:bg-white hover:text-black text-white rounded-full font-black text-xs uppercase transition-all duration-500 flex items-center gap-3">
                Explore Events <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => navigate("/explore/societies")} className="px-12 py-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full font-black text-xs uppercase hover:bg-white hover:text-black transition-all duration-500">
                Join Societies
              </button>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-white/10 border-y border-white/10">
          {[
            { label: "Ongoing Events", val: "12", icon: Calendar },
            { label: "Elite Societies", val: "18", icon: Users },
            { label: "Student Footfall", val: "10K+", icon: Zap }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] py-24 flex flex-col items-center group">
              <item.icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
              <span className="text-7xl font-black mb-2">{item.val}</span>
              <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">{item.label}</span>
            </div>
          ))}
        </section>

        {/* EVENTS SECTION */}
        <section className="py-40 px-6 max-w-7xl mx-auto events-grid">
          <div className="reveal-header mb-20">
            <h2 className="text-sm font-black text-blue-500 tracking-[0.5em] uppercase mb-4">// Major Highlights</h2>
            <h3 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Famous <br/>Events.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="event-card group relative aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070" className="w-full h-full object-cover group-hover:scale-110 transition-duration-1000" alt="Colosseum" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="bg-blue-600 text-[10px] font-black px-4 py-1 rounded-full w-fit mb-4 uppercase">Mega Event</div>
                <h4 className="text-6xl font-black mb-4">COLOSSEUM</h4>
                <div className="flex items-center gap-3 font-black text-sm group-hover:gap-5 transition-all uppercase tracking-widest">Register Now <ArrowRight size={18}/></div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {[{t: "SPANDAN", d: "The soul of Pantnagar.", date: "NOV 12-15"}, {t: "LIT-WEEK", d: "For the thinkers.", date: "OCT 05-08"}, {t: "ACCES", d: "Engineering marvels.", date: "DEC 01"}].map((ev, idx) => (
                <div key={idx} className="event-card p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                   <span className="text-blue-500 font-black text-xs tracking-widest italic">{ev.date}</span>
                   <h4 className="text-3xl font-black mt-4 mb-2">{ev.t}</h4>
                   <p className="text-gray-500 font-medium">{ev.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIETIES SECTION */}
        <section className="py-40 bg-white text-black societies-container rounded-[4rem] mx-4 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
             <div className="reveal-header text-center mb-24">
                <h2 className="text-sm font-black text-blue-600 tracking-[0.5em] uppercase mb-6 italic">The Ecosystem</h2>
                <h3 className="text-6xl md:text-9xl font-[1000] tracking-tighter leading-none">ELITE <br/>SOCIETIES.</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['CORSIT', 'EDC', 'ACUMEN', 'LIT-SOC'].map((soc, i) => (
                  <div key={i} className="society-card aspect-square border-2 border-black/5 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-black hover:text-white transition-all duration-500 group">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-6 group-hover:bg-white/10 flex items-center justify-center font-black text-xl">{soc[0]}</div>
                    <h5 className="text-2xl font-black mb-2">{soc}</h5>
                    <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-40">View Profile</p>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </div>

      {/* --- REVEAL FOOTER --- */}
      <footer className="reveal-footer fixed bottom-0 left-0 w-full h-[90vh] bg-blue-600 text-white z-10 flex flex-col justify-between p-12 md:p-24 overflow-hidden">
        <div className="absolute top-0 right-0 text-[30vh] font-black opacity-10 pointer-events-none select-none tracking-tighter translate-x-20">GBPUAT</div>
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-start mt-20">
          <div className="max-w-4xl">
            <h2 className="text-8xl md:text-[180px] font-[1000] tracking-[-0.05em] leading-[0.8] mb-12">JOIN THE <br/>LEGACY.</h2>
            <p className="text-2xl md:text-3xl font-black italic text-blue-200">Become a part of the most vibrant student community.</p>
          </div>
          <div className="flex flex-col gap-10 mt-12 md:mt-0 font-black text-sm uppercase tracking-widest">
             <div className="space-y-4">
                <p className="opacity-40 italic underline underline-offset-8 decoration-white/20">Quick Links</p>
                <div className="flex flex-col gap-3">
                   <a href="#" className="hover:line-through flex items-center gap-2">Events <ChevronRight size={16}/></a>
                   <a href="#" className="hover:line-through flex items-center gap-2">Societies <ChevronRight size={16}/></a>
                   <a href="#" className="hover:line-through flex items-center gap-2">Portion.dev <ChevronRight size={16}/></a>
                </div>
             </div>
          </div>
        </div>
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-12">
          <p className="font-black text-xl uppercase tracking-tighter">GBPUAT, Pantnagar</p>
          <div className="text-right">
            <p className="font-black text-xs tracking-widest opacity-40 mb-2">BUILT BY</p>
            <p className="text-4xl font-black tracking-tighter">PORTION.DEV</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExplorePage;