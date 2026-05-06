import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fcfdff] roboto text-gray-800 overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;