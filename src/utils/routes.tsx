import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../routes/auth/components/Login";
import Register from "../routes/auth/components/Register";
import App from "../routes/app/App";
import Auth from "../routes/auth/Auth";
import appLoader from "./loaders/app_loader/appLoader";
import SetUsername from "../routes/auth/components/SetUsername";
import Home from "../routes/app/outlets/Home";

const router = createBrowserRouter([
  {
    // use this as a landing page about the web app?? I DONT KNOOOWWW
    path: "/",
    loader: () => {
      return redirect("/app")
    }
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "username",
        element: <SetUsername />,
      }
    ],
  },
  {
    path: "/app",
    element: <App />,
    loader: appLoader,
    children: [

      {
        path: "home",
        element: <Home />

      },
      {
        path: "library",
        element: <Home />
      },
      {
        path: "book",
        element: <Home />
      }
    ]
  },
]);

export default router;
