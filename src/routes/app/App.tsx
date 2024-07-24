import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Sidebar from "./components/Sidebar";
import RecentNotesSidebar from "./components/RecentNotesSidebar";

export default function App(): React.ReactElement {
  const navigate = useNavigate();

  return <div className="main-container bg-light text-dk-100 ">
    <Sidebar />
    <main className="bg-red w-full">
      <Outlet />
    </main>
    <RecentNotesSidebar />
  </div>
};
