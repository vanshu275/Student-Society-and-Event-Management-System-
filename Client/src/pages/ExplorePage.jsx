import { useRef, useState } from "react";
import { EventCard } from "../components/EventCard";
import { ClubCard } from "../components/ClubCard";
import { StatCard } from "../components/StatCard";
import { Navbar } from "../components/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExplorePage = () => {
  const container = useRef(null);
  const imgRef = useRef(null);
  const [imgIndex, setImgIndex] = useState(1);



  return (
    <div ref={container} className="min-h-screen bg-[#fcfdff] roboto text-gray-800 overflow-x-hidden">
      <Navbar />
    </div>
  );
};

export default ExplorePage;