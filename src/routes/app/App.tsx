import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";

export default function App(): React.ReactElement {
  const navigate = useNavigate();

  return <main className="main-container bg-light text-dk-100 ">
    This is the main App component, it's purpose is to handle the logic behind the ui components that will be returned here.
    <Outlet />
  </main>
};
