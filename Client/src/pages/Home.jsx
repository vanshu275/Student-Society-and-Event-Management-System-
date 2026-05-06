import background from "../assets/background.mp4";
import { Link } from "react-router-dom";
import Starting from "../components/StartingEffect";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Starting />

      {/* Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={background} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        {/* Top */}
        <h1 className="text-3xl md:text-5xl font-bold text-white flex items-center gap-2 schoolbell">
          CollegeConnect
        </h1>

        {/* Center Hero */}
        <div className="flex items-center justify-center h-full">
          <h2 className="text-[8vw] leading-[1.05] font-bold text-white roboto text-center max-w-[90vw]">
            DISCOVER EVENTS
            <br />
            JOIN
            <span className="inline-block mx-4 align-middle">
              <video
                autoPlay
                loop
                muted
                className="w-[24vw] object-cover rounded-full"
              >
                <source src={background} type="video/mp4" />
              </video>
            </span>
            SOCIETIES
          </h2>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-6">
          <Link to="/explore">
            <button
              className="px-10 py-4 rounded-full text-white roboto 
              border border-white/30 
              backdrop-blur-md 
              hover:bg-white/10 
              transition-all duration-300 
              hover:scale-105"
            >
              Explore →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
