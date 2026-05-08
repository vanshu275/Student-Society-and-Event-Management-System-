import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
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
  });

  return (
    <footer className="reveal-footer fixed bottom-0 left-0 w-full h-[90vh] bg-black text-white z-10 flex flex-col justify-between p-12 md:p-24 overflow-hidden">
      <div className="absolute top-0 right-0 text-[30vh] font-black opacity-10 pointer-events-none select-none tracking-tighter translate-x-20">
        GBPUAT
      </div>
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start mt-20">
        <div className="max-w-4xl">
          <h2 className="text-8xl md:text-[180px] font-[1000] tracking-tighter leading-[0.8] mb-12">
            JOIN THE <br />
            LEGACY.
          </h2>
          <p className="text-2xl md:text-3xl font-black italic text-blue-200">
            Become a part of the most vibrant student community.
          </p>
        </div>
        <div className="flex flex-col gap-10 mt-12 md:mt-0 font-black text-sm uppercase tracking-widest">
          <div className="space-y-4">
            <p className="opacity-40 italic underline underline-offset-8 decoration-white/20">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to={"/explore/events"}
                className="hover:line-through flex items-center gap-2"
              >
                Events <ChevronRight size={16} />
              </Link>
              <Link
                to={"/explore/societies"}
                className="hover:line-through flex items-center gap-2"
              >
                Societies <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-12">
        <p className="font-black text-xl uppercase tracking-tighter">
          GBPUAT, Pantnagar
        </p>
        <div className="text-right">
          <p className="font-black text-xs tracking-widest opacity-40 mb-2">
            BUILT BY
          </p>
          <p className="text-4xl font-black tracking-tighter">RAGNAROK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
