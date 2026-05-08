// src/pages/Event.jsx

import { useRef } from "react";
import { useEvent } from "../context/EventContext";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Event = () => {
  const { events, loading, handleRegister } = useEvent();

  const containerRef = useRef();

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".slide");

      const mainTween = gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: "+=3000",
        },
      });

      slides.forEach((slide) => {
        const img = slide.querySelector("img");
        const content = slide.querySelector(".planet-content");

        gsap.fromTo(
          img,
          {
            scale: 0.3,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: mainTween,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          content,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: mainTween,
              start: "left 60%",
              end: "left center",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white text-4xl">
        Loading...
      </div>
    );
  }

  return (
    <>
    
      {/* HERO SECTION */}
      <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
        <div className="relative z-20 bg-[#0a0a0a] main-content mb-[90vh] shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
          <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full top-[-10%] left-[20%]" />
            <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full bottom-[-10%] right-[10%]" />

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6">
              <p className="uppercase tracking-[10px] text-gray-400 mb-6">
                University Events Portal
              </p>

              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none mb-8">
                Explore <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Events
                </span>
              </h1>

              <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-2xl leading-relaxed">
                Discover hackathons, coding contests, AI expos, music nights,
                startup summits, workshops, cultural festivals and unforgettable
                campus experiences happening across the university.
              </p>

            

              {/* Scroll Text */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-120px] animate-bounce">
                <p className="text-gray-500 tracking-[6px] text-sm">
                  SCROLL TO EXPLORE
                </p>
              </div>
            </div>
          </section>

          {/* EVENTS SECTION */}
          <div
            ref={containerRef}
            className="flex w-[400vw] h-screen overflow-hidden bg-black"
          >
            {events.map((event) => (
              <section
                key={event._id}
                className="slide relative w-screen h-screen flex items-center justify-center overflow-hidden"
              >
                {/* BACKGROUND */}
                <div className="absolute inset-0">
                  <img
                    src={
                      event.bannerImage ||
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* CONTENT */}
                <div className="planet-content relative z-10 w-[90%] max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 text-white">
                  {/* LEFT */}
                  <div className="flex-1">
                    <p className="uppercase tracking-[8px] text-gray-400 mb-4">
                      {event.category}
                    </p>

                    <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
                      {event.title}
                    </h1>

                    <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-10">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-gray-400 text-sm mb-2">DATE</h3>

                        <p className="text-2xl font-bold">
                          {new Date(event.date).toDateString()}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-gray-400 text-sm mb-2">VENUE</h3>

                        <p className="text-2xl font-bold">{event.venue}</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-gray-400 text-sm mb-2">FEE</h3>

                        <p className="text-2xl font-bold">
                          ₹ {event.registrationFee}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-gray-400 text-sm mb-2">
                          PARTICIPANTS
                        </h3>

                        <p className="text-2xl font-bold">
                          {event.participants.length}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegister(event._id)}
                      className="px-10 py-4 rounded-full bg-white text-black text-lg font-bold hover:scale-105 transition-all duration-300"
                    >
                      Register Now
                    </button>
                  </div>

                  {/* RIGHT IMAGE */}
                  <div className="flex-1 flex justify-center">
                    <img
                      src={
                        event.bannerImage ||
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
                      }
                      alt={event.title}
                      className="w-[500px] h-[650px] object-cover rounded-[40px] shadow-2xl border border-white/10"
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Event;
