import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const Starting = () => {
  const container = useRef();
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    tl.from(container.current.children, {
      opacity: 0,
      y: 50, 
      stagger: 0.7,
      ease: "power3.out",
    })
    
    .to(container.current, {
      y: "-100vh",
      duration: .8,
      ease: "power4.inOut",
      delay: 0.5,
    });
  }, { scope: container });


  if (!isVisible) return null;

  const words = ["GBPUAT" , "SOCIETIES" , "AND" , "EVENTS"];

  return (
    <div
      ref={container}
      className="z-100 fixed inset-0 bg-black flex flex-wrap justify-center items-center gap-x-6 gap-y-4 px-10 text-6xl md:text-8xl uppercase tracking-tighter overflow-hidden schoolbell font-extrabold "
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="bg-linear-to-r from-[#f6b383] to-[#6c1f0d] bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default Starting;