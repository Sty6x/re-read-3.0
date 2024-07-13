import { useEffect } from "react"
import { Outlet, redirect } from "react-router-dom";

export default function Login(): React.ReactElement {
  return <div>
    Login Route
    <Outlet />
  </div>
};
