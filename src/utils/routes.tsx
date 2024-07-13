import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../routes/auth/components/Login";
import Register from "../routes/auth/components/Register";
import App from "../routes/app/App";
import Auth from "../routes/auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    loader:
      async () => {
        return redirect("/auth");
      }
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/app",
    element: <App />
  }
]
)



export default router;
