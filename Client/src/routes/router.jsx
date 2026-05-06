import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ExplorePage from "../pages/ExplorePage";
import Event from "../pages/Event";
import Society from "../pages/Society";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
// import Home from "../pages/Home";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/explore",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ExplorePage />,
      },
      {
        path: "events",
        element: <Event />,
      },
      {
        path: "societies",
        element: <Society />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
