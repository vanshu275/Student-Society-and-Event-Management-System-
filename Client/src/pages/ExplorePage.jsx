import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Footer from "../components/Footer";
import Hero from "../components/explore/Hero";
import Event from "../components/explore/Event";
import Society from "../components/explore/Society";

gsap.registerPlugin(ScrollTrigger);

const ExplorePage = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // HERO ENTRY
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-title",
          {
            y: 120,
            opacity: 0,
            skewY: 19,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-buttons",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        );

      // IMAGE FADE LOOP
      gsap.to(".hero-image", {
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // HEADERS
      gsap.utils.toArray(".reveal-header").forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // EVENT CARDS
      gsap.fromTo(
        ".event-card",
        {
          y: 80,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".events-section-trigger",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          clearProps: "all",
        },
      );

      // SOCIETY CARDS
      gsap.fromTo(
        ".society-card",
        {
          y: 60,
          scale: 0.8,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".societies-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "expo.out",
          clearProps: "all",
        },
      );

      ScrollTrigger.refresh();
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <div className="relative z-20 bg-[#0a0a0a] main-content mb-[90vh] shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        <Hero />
        <Event />
        <Society />
      </div>

      <Footer />
    </div>
  );
};

export default ExplorePage;
