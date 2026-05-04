import { createBrowserRouter } from "react-router-dom";
// import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage"


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
   
  // },

  {
    path : "/",
    element : <ExplorePage />
  }
]);

export default router;