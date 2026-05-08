import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // 👈 add this
import { EventProvider } from "./context/EventContext.jsx";
import {SocietyProvider} from "./context/SocietyContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <EventProvider>
      <SocietyProvider  >
        <RouterProvider router={router} />
      </SocietyProvider>
    </EventProvider>
  </AuthProvider>,
);
